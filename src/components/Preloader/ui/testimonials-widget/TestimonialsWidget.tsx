import { FC } from "react";

type TestimonialsWidgetProps = {
  testimonials: string[];
};

export const TestimonialsWidget: FC<TestimonialsWidgetProps> = (props) => {
  const { testimonials } = props;
  return (
    <>
      <h5
        style={{
          color: "#a186dd",
          textAlign: "center",
          margin: "0 auto",
          marginBottom: "-30px",
          marginTop: "15px",
        }}
      >
        Отзывы
      </h5>
      <div
        style={{
          marginTop: "20px",
          overflowX: "scroll",
          display: "flex",
          gap: "20px",
          padding: "45px 12px",
          background: "#fff",
          paddingTop: "20px",
          paddingBottom: "60px",
          width: "100%",
        }}
      >
        {testimonials.map((item, index) => (
          <img
            key={index}
            src={item}
            alt="testimonials"
            style={{ width: "150px" }}
          />
        ))}
      </div>
    </>
  );
};
