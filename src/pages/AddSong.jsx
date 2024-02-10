import { Button, Input } from "@nextui-org/react";
import React from "react";

export const AddSong = () => {
  return (
    <>
      <h1>AddSong</h1>
        <form
          className="flex flex-col flex-wrap justify-between h-full max-w-screen-md mx-auto"
          method="post"
          action="/addSong"
        >
          <div className="grid grid-cols-1 px-2 md:grid-cols-2 gap-4">
            <Input
              key="title"
              type="text"
              label="Title"
              labelPlacement="outside"
            />

            <Input
              key="author"
              type="text"
              label="Author"
              labelPlacement="outside"
            />

            <Input
              key="genre"
              type="text"
              label="Genre"
              labelPlacement="outside"
            />

            <Input
              key="year"
              type="number"
              label="Year"
              labelPlacement="outside"
            />
          </div>

          <Button
            type="submit"
            color="primary"
            variant="ghost"
            className="self-center my-4"
          >
            Submit
          </Button>
        </form>
    </>
  );
};
