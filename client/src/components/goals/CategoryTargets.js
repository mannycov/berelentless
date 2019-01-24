import React, { Component } from 'react';
import { Input } from 'reactstrap';

class CategoryTargets extends Component {

  render() {
    const { category, onChange } = this.props;
    let target;

    if (category === 'Strength') {
      target = 
      <div>
        <Input
          type="text"
          title="weightTarget"
          id="goal"
          placeholder="Weight Target"
          onChange={onChange}
        />
        <Input
          type="text"
          title="repTarget"
          id="goal"
          placeholder="Rep Target"
          onChange={onChange}
        />
      </div>
    } else if (category === 'Conditioning') {
      target = 
      <div>
        <Input
          type="text"
          title="minutes"
          id="goal"
          placeholder="Minutes"
          onChange={onChange}
        />
        <Input
          type="text"
          title="seconds"
          id="goal"
          placeholder="Seconds"
          onChange={onChange}
        />
      </div>
    } else if (category === 'Habit') {
      target =
        <Input
          type="text"
          title="days"
          id="goal"
          placeholder="Days"
          onChange={onChange}
        />
    }

    return (
      <div>{target}</div>
    )
  }

}

export default CategoryTargets;