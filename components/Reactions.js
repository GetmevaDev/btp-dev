import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "../context/state";
import axios from 'axios';
import { parseCookies } from "nookies";
import {Spinner } from 'react-bootstrap'

const Reactions = ({profile}) => {
  const { appState } = useAppContext();
  const [reactionSelected, setReactionSelected] = useState(null);
  const [reactions, setReactions] = useState([]);
  const { jwt } = parseCookies();
  const reactionsOptions = ['like', 'care', 'wow', 'sad']
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
     axios.get(`${process.env.BACKEND_URL}/facebook-reactions?_limit=10000&profile.id=${profile.id}`)
     .then(({data}) => {
      setReactions(data)
     })
     .catch((e) => {
       console.log(e.message);
     })
  }, [])

  useEffect(() => {
    if (reactions.length && !appState.isGuest) {
      const reactionSel = reactions.find(reaction => reaction.user.id == appState.user.id);
      if (reactionSel) {
        setReactionSelected(reactionSel.type);
      }
    }
  }, [reactions])


  const updateReaction = (reaction) => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };


    if (!reactionSelected) {
      setIsLoading(true)
      setReactionSelected(reaction)

      axios.post(`${process.env.BACKEND_URL}/facebook-reactions`, {
        type: reaction,
        user: appState.user,
        profile
      }, config)
      .then(({data}) => {
        setReactions([...reactions, data])
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
        console.log(e.message);
      })
    } else {
      const reactionsOld = reactions;
      const reactionSel = reactions.find(obj => obj.user.id == appState.user.id)
      const filteredReaction = reactions.filter(obj => obj.id !== reactionSel.id)
      setReactionSelected(reaction);
      setReactions([...filteredReaction, {...reactionSel, type: reaction}]);
      axios.put(`${process.env.BACKEND_URL}/facebook-reactions/${reactionSel.id}`,{
        type: reaction
      }, config)
      .then(({data}) => {
      })
      .catch((e) => {
        setReactions(reactionsOld)
        console.log(e.message);
      })
    }
  }



  return (
    <div className="reactions-wrapper col">
      <div className="box">
        {!appState.isGuest && (
          <>
            <input type="checkbox" id="like" className="field-reactions" />
            <h3 className="text-desc">
              Press space and after tab key to navigation
            </h3>
            <label for="like" className="label-reactions">
              {reactionSelected ? (<>
              {reactionsOptions.map((option) => {
                if (option == reactionSelected) {
                  return <Image src={`/icons/${option}.svg`} alt="option" key={`${option}img`} width={500} height={500} />
                }
              })}
              </>): <Image src="/icons/like-button.png" alt="" width={400} height={400} />}
            </label>
            <label className="overlay" for="like"></label>
            <div className="toolbox">

              {reactionsOptions.map((option) => (
                <button className={`reaction-${option}`} onClick={() => updateReaction(option)} key={option}>
                <Image src={`/icons/${option}.svg`} alt={option} width={500} height={500} />
                <span className="legend-reaction">{option}</span>
              </button>
              ))}
            </div>
          </>
        ) }
      </div>
      <div className="reactions-count">
        {!isLoading ? reactionsOptions.map((option) => {
          if (reactions.find((reaction) => reaction.type == option)) {
            return (
              <div className="reactions-count-wrapper">
              <Image
                className="reactions-count__icon"
                src={`/icons/${option}.svg`}
                alt={option}
                key={`counter${option}`}
                width={500}
                height={500}
              />
              <span className="reactions-count__amount">{reactions.filter((reaction) => reaction.type == option).length }</span>
            </div>
            )
          } else {
            return null
          }
         }) : <Spinner animation="border" />}
      </div>
    </div>
  );
};

export default Reactions;
