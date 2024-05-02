import { NextPage, NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
}

export default function Error({ statusCode }: ErrorProps) {
  return (
    <section className="flex w-full h-[80%] items-center justify-center">
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    </section>
  );
}

Error.getInitialProps = async ({ res, err }: NextPageContext): Promise<ErrorProps> => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
}
