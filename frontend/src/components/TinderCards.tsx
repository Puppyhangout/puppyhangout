import { Box, Button, IconButton, SxProps, Theme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { createRef, useEffect, useMemo, useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import { fetch_puppies } from "../helpers/home_helpers";
import { store } from "../store";
import { blank_photo } from "./signup/signup_page";
import "./TinderCards.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const style: { [key: string]: SxProps<Theme> } = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    "max-width": "85vw",
    flexDirection: "column",
  },
  tinderCard: {
    height: "55vh",
  },
};

export const TinderCards = observer(() => {
  useEffect(() => {
    fetch_puppies();
  }, []);
  useEffect(() => {
    updatecurrentIndex(store.home.puppies.length - 1);
  }, [store.home.puppies]);
  const [currentIndex, updatecurrentIndex] = useState(-1);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo<any[]>(
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

  const chat = (idx: number) => {
    const pup = store.home.puppies[idx];
    store.chat.to_user = pup.users[0];
    store.shared.tab = "Chat";
  };

  return (
    <Box sx={{ ...style.root, ...style.top } as SxProps<Theme>}>
      <Box sx={{ ...style.root, ...style.tinderCard } as SxProps<Theme>}>
        {store.home.puppies.map((pup: any, index: number) => (
          // @ts-ignore
          <TinderCard
            onSwipe={(direction: string) => {
              if (["up", "right"].includes(direction)) {
                chat(index);
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
        ))}
      </Box>
      <Box sx={style.root}>
        {canSwipe && (
          <IconButton
            onClick={() => {
              swipe("left");
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        )}
        {canSwipe && (
          <Button
            onClick={() => {
              chat(currentIndex);
            }}
          >
            Chat
          </Button>
        )}
      </Box>
    </Box>
  );
});
