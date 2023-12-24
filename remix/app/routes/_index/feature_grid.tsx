import styles from "@/routes/_index/_index.module.css";

const cardData = [
  { id: 1, title: "Card Title 1", content: "Content for card 1" },
  { id: 2, title: "Card Title 2", content: "Content for card 2" },
  { id: 3, title: "Card Title 3", content: "Content for card 3" },
  { id: 4, title: "Card Title 4", content: "Content for card 4" },
];

const FeatureGrid = () => {
  return (
    <div className={styles.grid_container}>
      
      {cardData.map((card) => (
        <div key={card.id} className={styles.card_container}>
          <div className={styles.card}>
            <h4>{card.title}</h4>
            <p>{card.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
