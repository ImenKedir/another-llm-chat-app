import styles from "@/routes/_index/_index.module.css";

const cardData = [
  {
    id: 1,
    title: "Immersive Conversations",
    content:
      "Step into an enchanting realm of interactive storytelling, " +
      "where you can engage in deep conversations with AI-driven characters. " +
      "Flirt, connect, and experience the thrill of building unique bonds with " +
      "characters who will always be there for you.",
    source: "/images/image19.jpeg",
  },
  {
    id: 2,
    title: "Image-Chat Fusion",
    content:
      "Effortlessly generate vivid images from any chat. " +
      "Initiate engaging chats from any image. We're the first to offer this seamless integration of " +
      "image-driven chats and chat-inspired imagery, creating an unparalleled, immersive experience.",
    source: "/images/image16.jpeg",
  },
  {
    id: 3,
    title: "Images and Text",
    content:
      "Be whoever " +
      "you wish to be. Customize your digital avatar, tailoring every aspect to match your desired identity." +
      "Explore conversations from a new perspective or simply enjoy the thrill of" +
      "embodying a different persona. Our platform offers the flexibility and freedom to redefine who the AI perceives you as.",
    source: "/images/image20.jpeg",
  },
];

const FeatureGrid = () => {
  return (
    <div className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 box-border px-[20px] h-full w-full gap-[30px] columns-2">
      {cardData.map((card) => (
        <div key={card.id} className="flex shadow-lg bg-[var(--secondary-dark)] justify-center text-center p-[10%] transition rounded-xl border border-[var(--secondary-light)] hover:border-[var(--primary-accent)] hover:shadow-2xl">
          <div className="flex flex-col align-center h-full ">
            <img src={card.source} alt="" />
            <h1 className="text-2xl text-[var(--primary-light)] font-[Geist-Bold] ">{card.title}</h1>
            <p className="text-start pt-0 text-white">{card.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
