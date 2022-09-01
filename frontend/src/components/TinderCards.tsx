import { IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { createRef, useEffect, useMemo, useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import { fetch_puppies } from "../helpers/home_helpers";
import { store } from "../store";
import { blank_photo } from "./signup/signup_page";
import "./TinderCards.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const TinderCards = observer(() => {
  useEffect(() => {
    fetch_puppies();
  }, []);
  useEffect(() => {
    updatecurrentIndex(store.home.puppies.slice(0, 4).length - 1);
  }, [store.home.puppies.slice(0, 4).length]);
  const [currentIndex, updatecurrentIndex] = useState(-1);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(4)
        .fill(0)
        .map((i) => createRef()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    currentIndexRef.current = val;
    updatecurrentIndex(val);
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, index: number) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    // console.log(
    //   `${name} (${idx}) left the screen!`,
    //   currentIndexRef.current,
    //   currentIndex
    // );
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: string) => {
    if (canSwipe) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // console.log
  return (
    <div>
      {store.home.puppies.slice(0, 4).map((pup: any, index: number) => (
        // @ts-ignore
        <>
          <TinderCard
            onSwipe={(direction: string) => {
              if (["up", "right"].includes(direction)) {
                store.chat.to_user = pup.users[0];
                store.shared.tab = "Chat";
              } else {
                swiped(direction, index);
              }
            }}
            onCardLeftScreen={() => outOfFrame(pup.name, index)}
            ref={childRefs[index]}
            className="swipe"
            key={pup.id}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{
                backgroundImage: `url(${pup.photos[0].url || blank_photo})`,
              }}
              className="card"
            >
              <h3>
                {pup.name}, {pup.breed}
              </h3>
            </div>
          </TinderCard>
        </>
      ))}
      {canSwipe && (
        <IconButton
          onClick={() => {
            swipe("left");
          }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      )}
    </div>
  );
});
