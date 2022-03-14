import { render, screen } from "@testing-library/react";
import { getPrismicClient } from "../../services/prismic";
import Posts, { getStaticProps, Post } from "../../pages/posts";
import { mocked } from "ts-jest/utils";

jest.mock("../../services/prismic");

const posts: Post[] = [
  {
    slug: "My post",
    title: "My post",
    excerpt: "Post excerpt",
    updatedAt: "fake-updated",
  },
];

describe("Posts page", () => {
  it("should render correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockReturnValueOnce({
        results: [
          {
            uid: "My post",
            data: {
              title: [{ type: "heading", text: "My post" }],
              content: [{ type: "paragraph", text: "Post excerpt" }],
            },
            last_publication_date: "04-01-2022",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "My post",
              title: "My post",
              excerpt: "Post excerpt",
              updatedAt: "01 de abril de 2022",
            },
          ],
        },
      })
    );
  });
});
