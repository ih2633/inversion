import Card from "./Card";
import type { ArticleWithRelation } from "@/types/article"

type Props = {
  articles: ArticleWithRelation[]
  selectCategory: string | ((category: string) => void) | undefined
}

const Cards = (props: Props) => {
  return (
    <>
      <div className="space-y-4">
        {props.articles.map((article) => {
          if (props.selectCategory === "All") {
            return <Card key={article.id} article={article} />;
          } else if (props.selectCategory === article?.category?.name) {
            return <Card key={article.id} article={article} />;
          }
        })}
      </div>
    </>
  );
};

export default Cards;