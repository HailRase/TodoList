import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import TaskWithSelectors from "../TaskWithSelectors";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TodoList/Task',
  component: TaskWithSelectors,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof TaskWithSelectors>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskWithSelectors> = (args) => <TaskWithSelectors {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
  todoListId: 'todoListId_1',
  taskId: '1'
};


