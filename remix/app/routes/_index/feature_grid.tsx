import styles from "@/routes/_index/_index.module.css";

const cardData = [
  {
    id: 1,
    title: "Personas",
    content:
      "Chat from multiple perspectives, lorem ipsum sum lorem ipsum sum lorem",
  },
  {
    id: 2,
    title: "Immersive Text RPG Experience",
    content: "Dive into lorem ipsum sum lorem ipsum sum lorem ipsum sum",
  },
  {
    id: 3,
    title: "Images and Text, All-in-one",
    content:
      "Create high-quality images of what is happening during a conversaion in real-time lorem ipsum sum lorem ipsum sum",
  },
  {
    id: 4,
    title: "Create Your Own Chats",
    content:
      "Design your own characters to chat with abd add lorem ipsum sum lorem ipsum sum lorem",
  },
];

const FeatureGrid = () => {
  return (
    <div className={styles.grid_container}>
      {cardData.map((card) => (
        <div key={card.id} className={styles.card_container}>
          <div className={styles.card}>
            <h2>{card.title}</h2>
            <p>{card.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
