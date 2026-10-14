import "./SectionTitle.css";

interface SectionTitleProps {
  label: string;
  title: string;
}

function SectionTitle({
  label,
  title,
}: SectionTitleProps) {
  return (
    <div className="section-title">
      <div className="section-title__label">
        <span></span>
        {label}
      </div>

      <h2>{title}</h2>
    </div>
  );
}

export default SectionTitle;