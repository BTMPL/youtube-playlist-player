import React from "react";
import { shallow, mount } from "enzyme";
import { expect } from "chai";

import { PlaylistItem, PlaylistItems } from "../PlaylistItems";

import fixtures from "../__fixtures__/PlaylistItems";

let jsdom = require("jsdom").jsdom;

global.document = jsdom("");
global.window = document.defaultView;

describe("PlaylistItem", () => {

  it("Renders", () => {
    expect(shallow(<PlaylistItem current={true} playSong={() => {}} item={fixtures.items[0]} />).text()).to.contain(fixtures.items[0].snippet.title);
  });

  it("Calls the callback with videoId", (done) => {
    let wrapper = shallow(<PlaylistItem current={true} playSong={(videoId) => {
      if(videoId == fixtures.items[0].contentDetails.videoId) {
        done();
      }
    }} item={fixtures.items[0]} />);
    wrapper.simulate("click");
  });

});


describe("PlaylistItems", () => {

  it("Renders", () => {
    let wrapper = mount(<PlaylistItems currentSong="" playSong={() => {}} items={fixtures.items} />);
    expect(wrapper.text()).to.contain(fixtures.items[0].snippet.title);
    expect(wrapper.find("PlaylistItem")).to.have.length(2);
  });

  it("Passes the callback to <PlaylistItem />", (done) => {
    let wrapper = mount(<PlaylistItems currentSong="" playSong={(videoId) => {
      if(videoId == fixtures.items[0].contentDetails.videoId) done();
    }} items={fixtures.items} />)

    wrapper.find('PlaylistItem').first().simulate("click");
  });
});
