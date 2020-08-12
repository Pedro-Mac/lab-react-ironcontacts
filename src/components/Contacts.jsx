import React, { Component } from 'react';

import people from './../contacts.json';

export class Contacts extends Component {
  constructor() {
    super();

    this.state = {
      contacts: people.slice(0, 5),
    };
  }

  addContact = () => {
    const avaliablePeople = people.filter((person) => {
      const personIsListed = this.state.contacts.includes(person);
      return !personIsListed;
    });

    if (avaliablePeople.length) {
      const newContact =
        avaliablePeople[Math.floor(Math.random() * avaliablePeople.length)];
      const list = [...this.state.contacts, newContact];

      this.setState({
        contacts: list,
      });
    }
  };

  sortByName = () => {
    const list = [...this.state.contacts];
    list.sort((a, b) => {
      return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
    });

    this.setState({
      contacts: list,
    });
  };

  sortByPop = () => {
    const list = [...this.state.contacts];
    list.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    this.setState({
      contacts: list,
    });
  };

  deleteContact = (index) => {
    const list = [...this.state.contacts];
    list.splice(index, 1);
    this.setState({
      contacts: list,
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.addContact}>Add Contact</button>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPop}>Sort by popularity</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((person, index) => {
              return (
                <tr key={person.id} onDelete={this.deleteContact}>
                  <td>
                    <img
                      src={person.pictureUrl}
                      alt={person.name}
                      style={{ maxWidth: '150px' }}
                    ></img>
                  </td>
                  <td>{person.name}</td>
                  <td>{person.popularity.toFixed(2)}</td>
                  <td>
                    <button onClick={() => this.deleteContact(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Contacts;
