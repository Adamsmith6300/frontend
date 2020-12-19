import { Segment, Loader, Dimmer } from "semantic-ui-react";

export const LargeLoader = ({}) => (
  <Dimmer active inverted>
    <Loader size="large" />
  </Dimmer>
);

export const MiniLoader = ({}) => (
  <Dimmer active inverted>
    <Loader size="mini" />
  </Dimmer>
);
