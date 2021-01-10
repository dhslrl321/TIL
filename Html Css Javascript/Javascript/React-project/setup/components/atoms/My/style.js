import styled from "styled-components";
import { theme } from "styled-tools";

export const My = styled.h1`
  ${({ title }) => title && theme("fontStyle.title")};
  ${({ subtitle }) => subtitle && theme("fontStyle.subtitle")};
  ${({ paragraph }) => paragraph && theme("fontStyle.paragraph")};
`;