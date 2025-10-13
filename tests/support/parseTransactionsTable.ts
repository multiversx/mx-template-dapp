import { SelectorsEnum } from './testdata';
import { getTestIdSelector } from './testIdSelector';
import {
  ParseTransactionsTableType,
  TransactionFilter,
  TransactionRow
} from './types';

// Function to count transactions with given filters
export const countTransactions = (
  transactions: TransactionRow[],
  filter: TransactionFilter
): number => {
  const filteredTransactions = filterTransactions(transactions, filter);
  const count = filteredTransactions.length;

  if (filter.enableLogging) {
    console.log(
      `countTransactions: Found ${count} matching transactions out of ${transactions.length} total`
    );
  }

  return count;
};

// Helper function to parse age text into minutes
const parseAge = (ageText: string): number => {
  const match = ageText.match(/(\d+)\s*(sec|min|hr|day)/);
  if (!match) {
    return 0;
  }

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  // TODO: add more units if needed besides sec, min, hr, day
  switch (unit) {
    case 'sec':
      return value / 60; // seconds to minutes
    case 'min':
      return value;
    case 'hr':
      return value * 60; // hours to minutes
    case 'day':
      return value * 24 * 60; // days to minutes
    default:
      return 1000; // default in case of unexpected unit
  }
};

// Helper function to filter transactions
export const filterTransactions = (
  transactions: TransactionRow[],
  filter: TransactionFilter
): TransactionRow[] => {
  const enableLogging = filter.enableLogging || false;

  if (enableLogging) {
    console.log(
      `Filtering ${transactions.length} transactions with criteria:`,
      {
        exactValue: filter.exactValue,
        methods: filter.methods,
        maxAgeInMinutes: filter.maxAgeInMinutes,
        minAgeInMinutes: filter.minAgeInMinutes,
        onlySuccessful: filter.onlySuccessful,
        onlyFailed: filter.onlyFailed,
        fromAddress: filter.fromAddress,
        toAddress: filter.toAddress
      }
    );
  }

  const filteredTransactions = transactions.filter((transaction, index) => {
    let matches = true;
    let reason = '';

    // Age filter
    if (
      filter.maxAgeInMinutes !== undefined &&
      transaction.ageInMinutes > filter.maxAgeInMinutes
    ) {
      matches = false;
      reason = `age ${transaction.ageInMinutes} > max ${filter.maxAgeInMinutes}`;
    }
    if (
      matches &&
      filter.minAgeInMinutes !== undefined &&
      transaction.ageInMinutes < filter.minAgeInMinutes
    ) {
      matches = false;
      reason = `age ${transaction.ageInMinutes} < min ${filter.minAgeInMinutes}`;
    }

    // Method filter
    if (
      matches &&
      filter.methods &&
      !filter.methods.includes(transaction.method)
    ) {
      matches = false;
      reason = `method "${transaction.method}" not in [${filter.methods.join(
        ', '
      )}]`;
    }

    // Value filter
    if (
      matches &&
      filter.exactValue !== undefined &&
      transaction.value !== filter.exactValue
    ) {
      matches = false;
      reason = `value ${transaction.value} !== ${filter.exactValue}`;
    }

    // Status filter
    if (matches && filter.onlySuccessful && transaction.isFailed) {
      matches = false;
      reason = 'transaction failed but onlySuccessful=true';
    }
    if (matches && filter.onlyFailed && !transaction.isFailed) {
      matches = false;
      reason = 'transaction successful but onlyFailed=true';
    }

    // Address filters
    if (
      matches &&
      filter.fromAddress &&
      !transaction.fromAddress.includes(filter.fromAddress)
    ) {
      matches = false;
      reason = `fromAddress "${transaction.fromAddress}" does not contain "${filter.fromAddress}"`;
    }
    if (
      matches &&
      filter.toAddress &&
      !transaction.toAddress.includes(filter.toAddress)
    ) {
      matches = false;
      reason = `toAddress "${transaction.toAddress}" does not contain "${filter.toAddress}"`;
    }

    if (enableLogging) {
      console.log(
        `Transaction ${index + 1}: ${
          matches ? 'MATCH' : 'FILTERED'
        } - method="${transaction.method}", value=${transaction.value}, age=${
          transaction.ageInMinutes
        }min${reason ? `, reason: ${reason}` : ''}`
      );
    }

    return matches;
  });

  if (enableLogging) {
    console.log(
      `Filtered ${transactions.length} transactions down to ${filteredTransactions.length} matches`
    );
  }

  return filteredTransactions;
};

export const parseTransactionsTable = async ({
  page,
  tableSelector,
  tableType,
  maxRows,
  enableLogging = false
}: ParseTransactionsTableType): Promise<TransactionRow[]> => {
  // Set table selector based on table type
  const defaultTableSelector =
    tableType === 'ping-pong'
      ? SelectorsEnum.transactionsPingPongTable
      : SelectorsEnum.transactionsAllTable;

  const finalTableSelector = tableSelector || defaultTableSelector;
  const table = page.locator(finalTableSelector);
  await table.waitFor({ state: 'visible' });
  await table.scrollIntoViewIfNeeded();

  // Get all table rows (excluding header)
  const rows = table.locator(SelectorsEnum.transactionsTableBodyRow);
  const totalRowCount = await rows.count();

  // Limit the number of rows to process if maxRows is specified
  const rowCount = maxRows ? Math.min(maxRows, totalRowCount) : totalRowCount;

  if (enableLogging) {
    console.log(
      `Found ${totalRowCount} transaction rows, processing ${rowCount} rows`
    );
  }

  const transactions: TransactionRow[] = [];

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    try {
      if (enableLogging) {
        console.log(`Processing row ${i + 1}/${rowCount}`);
      }

      // Extract transaction hash
      const hashElement = row.locator(
        getTestIdSelector(SelectorsEnum.transactionLink)
      );
      const hash = await hashElement.getAttribute('href');
      const transactionHash = hash ? hash.split('/').pop() || '' : '';

      // Extract age
      const ageElement = row.locator(
        getTestIdSelector(SelectorsEnum.transactionAge)
      );
      const ageElementCount = await ageElement.count();

      if (enableLogging) {
        console.log(`Row ${i + 1} age element count: ${ageElementCount}`);
      }

      let ageText = '';
      let age = 0;

      if (ageElementCount > 0) {
        ageText = (await ageElement.textContent()) || '';
        age = parseAge(ageText);
        if (enableLogging) {
          console.log(`Row ${i + 1} age text: "${ageText}" -> ${age} minutes`);
        }
      } else if (enableLogging) {
        console.log(`Row ${i + 1} age element not found`);
      }

      // Extract shard info
      const senderShardElement = row.locator(
        getTestIdSelector(SelectorsEnum.senderShard)
      );
      const receiverShardElement = row.locator(
        getTestIdSelector(SelectorsEnum.receiverShard)
      );
      const senderShard = (await senderShardElement.textContent()) || '';
      const receiverShard = (await receiverShardElement.textContent()) || '';

      // Extract from/to addresses - use more flexible selectors
      const senderElement = row.locator(
        `${getTestIdSelector(
          SelectorsEnum.transactionSender
        )} ${getTestIdSelector(SelectorsEnum.trimFullAddress)}`
      );
      const receiverElement = row.locator(
        `${getTestIdSelector(
          SelectorsEnum.transactionReceiver
        )} ${getTestIdSelector(SelectorsEnum.receiverLink)}`
      );

      // Check if elements exist before trying to get text content
      const fromAddress =
        (await senderElement.count()) > 0
          ? (await senderElement.textContent()) || ''
          : '';
      const toAddress =
        (await receiverElement.count()) > 0
          ? (await receiverElement.textContent()) || ''
          : '';

      // Extract method
      const methodElement = row.locator(
        getTestIdSelector(SelectorsEnum.method)
      );
      const method = (await methodElement.textContent()) || '';

      // Extract value
      const valueIntElement = row.locator(
        getTestIdSelector(SelectorsEnum.formatAmountInt)
      );
      const valueDecimalsElement = row.locator(
        getTestIdSelector(SelectorsEnum.formatAmountDecimals)
      );
      const valueSymbolElement = row.locator(
        getTestIdSelector(SelectorsEnum.formatAmountSymbol)
      );

      // Check if elements exist before trying to get text content
      const valueIntElementCount = await valueIntElement.count();
      const valueDecimalsElementCount = await valueDecimalsElement.count();
      const valueSymbolElementCount = await valueSymbolElement.count();

      // Extract value components with fallbacks for missing elements
      // Some transaction rows may not have all value elements (e.g., failed transactions)
      const valueInt =
        valueIntElementCount > 0
          ? (await valueIntElement.textContent()) || '0'
          : '0';
      const valueDecimals =
        valueDecimalsElementCount > 0
          ? (await valueDecimalsElement.textContent()) || '.00'
          : '.00';
      const valueSymbol =
        valueSymbolElementCount > 0
          ? (await valueSymbolElement.textContent()) || ''
          : '';

      const value = parseFloat(`${valueInt}${valueDecimals}`);

      // Check if transaction failed (has error icon)
      const hasErrorIcon =
        (await row.locator(SelectorsEnum.errorIcon).count()) > 0;

      transactions.push({
        hash: transactionHash,
        age: ageText,
        ageInMinutes: age,
        senderShard,
        receiverShard,
        fromAddress,
        toAddress,
        method: method.toLowerCase(),
        value,
        symbol: valueSymbol,
        isFailed: hasErrorIcon
      });

      if (enableLogging) {
        console.log(`Successfully processed row ${i + 1}`);
      }
    } catch (error) {
      if (enableLogging) {
        console.log(`Error processing row ${i + 1}:`, error);
      }
      // Continue with next row instead of failing completely
      continue;
    }
  }

  return transactions;
};
