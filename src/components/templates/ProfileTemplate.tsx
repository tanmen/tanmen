import React, { FC } from "react";
import { Header, Layout } from "../molecules";
import { Footer } from "../molecules/Footer";
import { ComingSoon } from "../organisms";

export const ProfileTemplate: FC = () =>
  <Layout direction="up">
    <ComingSoon/>
  </Layout>;
