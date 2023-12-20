import styles from "@/routes/_index/_index.module.css";

const FeatureGrid = () => {
  return (
    <div className={styles.grid_container}>
      {[1, 2, 3, 4].map((card) => (
        <div key={card} className={styles.card_container}>
          <div className={styles.card}>
            <h4>Card Title {card}</h4>
            <p>Content for card {card}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
