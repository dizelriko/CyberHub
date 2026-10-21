interface FaqItem {
  question: string;
  answer: string;
}

interface FaqListProps {
  items: FaqItem[];
  className: string;
}

const FaqList = ({ items, className }: FaqListProps) => (
  <div className={className}>
    {items.map((item, index) => (
      <details key={item.question} open={index === 0}>
        <summary>
          {item.question}
          <i className="bi bi-plus-lg"></i>
        </summary>
        <p>{item.answer}</p>
      </details>
    ))}
  </div>
);

export default FaqList;
