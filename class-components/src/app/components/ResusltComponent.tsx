import React from 'react';

interface Props {
  items: { name: string; description: string }[];
}

export class ResultsComponent extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.items.map((item, index) => (
          <div key={index}>
            <h3>{item.name || item}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
}
