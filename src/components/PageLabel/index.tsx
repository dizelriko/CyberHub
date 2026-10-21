interface PageLabelProps {
  children: string;
}

const PageLabel = ({ children }: PageLabelProps) => (
  <div className="page-label">
    <span></span>
    {children}
  </div>
);

export default PageLabel;
