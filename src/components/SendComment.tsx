import { Button, Dropdown, Textarea } from "flowbite-react";
import { memo, useMemo, useState } from "react";
import { RatingStars } from "./RatingStars";
1;
export const SendComment = memo(function SendComment() {
  const [value, setValue] = useState<number | "Rating">("Rating");
  const labels = useMemo(() => {
    return {
      Rating: "Rating",
      5: <RatingStars stars={5} filledStars={5} />,
      4: <RatingStars stars={5} filledStars={4} />,
      3: <RatingStars stars={5} filledStars={3} />,
      2: <RatingStars stars={5} filledStars={2} />,
      1: <RatingStars stars={5} filledStars={1} />,
    };
  }, []);

  return (
    <div className="">
      <Textarea id="comment" placeholder="Leave a comment..." required rows={4} />
      <div className="pt-4 flex justify-between">
        <Dropdown label={labels[value as keyof typeof labels]} inline>
          <Dropdown.Item onClick={() => setValue("Rating")}>
            {labels["Rating"]}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setValue(5)}>{labels[5]}</Dropdown.Item>
          <Dropdown.Item onClick={() => setValue(4)}>{labels[4]}</Dropdown.Item>
          <Dropdown.Item onClick={() => setValue(3)}>{labels[3]}</Dropdown.Item>
          <Dropdown.Item onClick={() => setValue(2)}>{labels[2]}</Dropdown.Item>
          <Dropdown.Item onClick={() => setValue(1)}>{labels[1]}</Dropdown.Item>
        </Dropdown>
        <Button disabled>Send</Button>
      </div>
    </div>
  );
});
