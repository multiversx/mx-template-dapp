import * as React from "react";

const PageState = ({
  title,
  description,
  svgComponent,
  className,
  spin = false,
}: {
  title?: string;
  description?: string | React.ReactNode;
  svgComponent: React.ReactNode;
  className?: string;
  spin?: boolean;
}) => {
  return (
    <div className="d-flex flex-fill align-items-center container page-state">
      <div className="row w-100">
        {spin ? (
          <div className="col-12 text-center" data-testid="loader">
            <div className="lds-ellipsis mx-auto mt-5 mb-5">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        ) : (
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="card shadow-sm rounded p-5 border-0">
              <div className="card-body text-center d-flex flex-column justify-content-center">
                <div className={`icon ${className ? className : ""}`}>
                  {svgComponent}
                </div>
                {title && <p className="h3 mt-3">{title}</p>}
                {description && <div className="mt-3">{description}</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageState;
