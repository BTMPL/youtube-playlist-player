import React from "react";
import { shallow, mount } from "enzyme";

import { PlaylistItem, PlaylistItems } from "../PlaylistItems";

import fixtures from "../__fixtures__/PlaylistItems";

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => {
      return store[key];
    },
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe("<PlaylistItem />", () => {
  test('Should not render when no props passed', () => {
    expect(shallow(<PlaylistItem current={true} playSong={() => {}} item={{}} />).text()).toBe('');
  });

  test('Should render HTML when passed props', () => {
    expect(shallow(<PlaylistItem current={true} playSong={() => {}} item={fixtures.items[0]} />).text()).toContain(fixtures.items[0].snippet.title);
  });

  test("Calls the callback with videoId", (done) => {
    let wrapper = shallow(<PlaylistItem current={true} playSong={(videoId) => {
      if(videoId == fixtures.items[0].contentDetails.videoId) {
        done();
      }
    }} item={fixtures.items[0]} />);
    wrapper.simulate("click");
  });
});

describe("<PlaylistItems />", () => {
  test("Renders with 2 items", () => {
    let wrapper = mount(<PlaylistItems currentSong="" playSong={() => {}} items={fixtures.items} />);
    expect(wrapper.text()).toContain(fixtures.items[0].snippet.title);
    expect(wrapper.find("PlaylistItem").length).toBe(2);
  });

  test("Passes the callback to ", (done) => {
    let wrapper = mount(<PlaylistItems currentSong="" playSong={(videoId) => {
      if(videoId == fixtures.items[0].contentDetails.videoId) done();
    }} items={fixtures.items} />)

    wrapper.find('PlaylistItem').first().simulate("click");
  });

  test("Reacts to updating props", (done) => {
    let wrapper = mount(<PlaylistItems currentSong="" playSong={() => {}} items={[]} />);
    wrapper.setProps({
      items: fixtures.items
    }, () => {
      expect(wrapper.text()).toContain(fixtures.items[0].snippet.title);
      expect(wrapper.find("PlaylistItem").length).toBe(2);
      done();
    });
  });
});