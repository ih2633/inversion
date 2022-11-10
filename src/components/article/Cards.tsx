import { useState } from "react";
import Card from "./Card";

const Cards = (props) => {


  return (
    <div className="space-y-4">
      {props.articles.map((article) => {
        // if (props.selectCategory === "Skill") {
        //   if (article?.category?.name === "Skill") { return <Card key={article.id} article={article} /> }
        // } else if (props.selectCategory === "Note") {
        //   if (article?.category?.name === "Note") { return <Card key={article.id} article={article} /> }
        // } else {
        //   return <Card key={article.id} article={article} />
        // }

        if (props.selectCategory === "All") {
          return <Card key={article.id} article={article}/>
        } else if (props.selectCategory === article?.category?.name) {
          return <Card key={article.id} article={article}/>
        }

      })
      }
    </div>
  );
};

export default Cards;