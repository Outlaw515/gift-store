interface ComingSoonProps {
  title: string;
}

function ComingSoon({ title }: ComingSoonProps) {
  return (
    <section className="coming-soon">
      <h3>{title}</h3>
      <p>هذا القسم قيد التجهيز، ترقبوه قريباً</p>
    </section>
  );
}

export default ComingSoon;