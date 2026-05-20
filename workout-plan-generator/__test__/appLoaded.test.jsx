import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";


jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
}));


describe('Page', () => {
  it('renders a heading', () => {
    const res = render(<Home />)

    const landing = res.container.querySelector('#find-test')

    expect(landing).toBeInTheDocument()

  })
})