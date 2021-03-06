import ContrastWrapper from '../../.storybook/components/ContrastWrapper'

import Inline from './Inline'
import Skeleton from './Skeleton'
import ListItem from './ListItem'

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

const Story = () => (
  <Inline>
    <ListItem>
      <Skeleton css={{ width: 200, height: 50 }} />
    </ListItem>
    <ListItem>
      <Skeleton css={{ width: 50, height: 50, borderRadius: '50%' }} />
    </ListItem>
  </Inline>
)

export const Overview = Story.bind({})

export const Contrast = Story.bind({})

Contrast.decorators = [
  (Example) => (
    <ContrastWrapper>
      <Example />
    </ContrastWrapper>
  ),
]
