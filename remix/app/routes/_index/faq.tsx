import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import styles from "@/routes/_index/_index.module.css";

const Data = [
    { 
      id: 1,  
      question: 'Is it free?',
      answer: 'Yes! NaughtyML is free to use as long as you make an account.'
    },
    { 
      id: 2, 
      question: 'Is there a content policy?',
      answer: 'Yes! Check this link to learn more about what we allow on our platform.'
    },
    { 
      id: 3,
      question: 'How can I get in touch with support?',
      answer: 'Shoot us an email at support@naughtyml.'
    }
  ];


const FAQ = () => {
    const [clicked, setClicked] = useState<number | null>(null);

    const toggle = (index: number) => {
      if (clicked === index) {
        // if clicked question is already active, then close it
        return setClicked(null);
      }
    
      setClicked(index);
    };

   return (
    <IconContext.Provider value={{ color: "#7a01de", size: '25px' }}>
      <div className={styles.accordion_section}>
        <div className={styles.accordion_container}>
          {Data.map((item) => { 
            return (
              <React.Fragment key={item.id}> 
                <div className={styles.accordion_wrap} onClick={() => toggle(item.id)}>
                  <h2>{item.question}</h2>
                  <span>{clicked === item.id ? <FiMinus /> : <FiPlus />}</span>
                </div>
                {clicked === item.id ? (
                  <div className={styles.accordion_dropdown}>
                    <p>{item.answer}</p>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default FAQ;
