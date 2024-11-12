

const ModalCustom = ({ title, children }) => {
  return (
    <div
      style={{
        border: "2px solid black",
        width: "300px",
        padding: "20px",
        backgroundColor: "white",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <h2>{title}</h2>
      {children}
      <h3>Algo más</h3>
    </div>
  );
};

export default ModalCustom;
