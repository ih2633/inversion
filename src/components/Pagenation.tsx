
type Props = {
  page: {
    skip: string,
    take: string
  }
}

const Pagenation = (props: Props) => {
  const prevSkip = sub(Number(props.page.skip), Number(props.page.take));
  const nextPage = Number(props.page.skip) + Number(props.page.take);

  return (
    <div className="btn-group mt-10 grid grid-cols-2 mx-3">
      <a
        href={`?skip=${prevSkip}&take=${props.page.take}`}
        className="btn-outline btn"
      >
        Previous
      </a>
      <a
        href={`?skip=${nextPage}&take=${props.page.take}`}
        className="btn-outline btn"
      >
        Next
      </a>
    </div>
  );
};

const sub = (skip:number, take:number) => {
    let x = skip - take;
    if (x < 0) {
      return (x = 0);
    }
    return x;
  };

export default Pagenation;
