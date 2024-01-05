import {Howl, Howler} from 'howler';

/**
 * Player class containing the state of our playlist and where we are in it.
 * Includes all methods for playing, skipping, updating the display, etc.
 * @param {Array} playlist Array of objects with playlist song details ({title, file, howl}).
 */
export function HPlayer(playlist) {
  this.playlist = playlist || [];
  this.index = 0;
};

HPlayer.prototype = {
  /**
   * Play a song in the playlist.
   * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
   */
  play: function(index) {
    let self = this;
    let sound;

    index = typeof index === 'number' ? index : self.index;
    let data = self.playlist[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
      sound.volume(0.2)
    } else {
      sound = data.howl = new Howl({
        src: [ data.file ],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        volume:0.2,
        preload: true,
        onload: function() {
        },
        onfade: function() {
          if(this.volume() === 0){
            this.pause()
          }
        },
        onend: function() {
          self.skip('next');
        },
        onpause: function() {
          // Stop the wave animation.
        },
        onstop: function() {
          // Stop the wave animation.
        },
      });
    }
    // Begin playing the sound.
    sound.play();

    // Keep track of the index we are currently playing.
    self.index = index;
  },
  fadeOut: function(){
    let self = this;

    // Get the Howl we want to manipulate.
    let sound = self.playlist[self.index].howl;

    sound.fade(sound.volume(), 0.0, 1000);
    // playBtn.classList.add('mute')
    // this.button.classList.add('mute');
  },
  fadeIn: function(){
    let self = this;

    // Get the Howl we want to manipulate.
    let sound = self.playlist[self.index].howl;
    if(sound) {
      sound.fade(0.0, 0.2, 1000)
      sound.play()
    }

    // playBtn.classList.remove('mute')
  },
  toggle: function(){
    let self = this;
    if(self.playlist?.length === 0) return false;

    // Get the Howl we want to manipulate.
    let sound = self.playlist[self.index].howl;
    if(sound){
      sound.playing() ? self.fadeOut() : self.fadeIn();
    } else {
      self.play();
      // playBtn.classList.remove('mute')
    }
  },
  playing: function(){
    let self = this;
    if(self.playlist?.length === 0) return false;
    // Get the Howl we want to manipulate.
    let sound = self.playlist[self.index].howl;
    if(sound){
      return sound.playing();
    } else {
      return false;
      // playBtn.classList.remove('mute')
    }
  },
  /**
   * Pause the currently playing track.
   */
  pause: function() {
    let self = this;

    // Get the Howl we want to manipulate.
    let sound = self.playlist[self.index].howl;

    if(!sound) return;
    // Puase the sound.
    sound.pause();

    // Show the play button.
  },

  /**
   * Skip to the next or previous track.
   * @param  {String} direction 'next' or 'prev'.
   */
  skip: function(direction) {
    let self = this;

    // Get the next track based on the direction of the track.
    let index = 0;
    if (direction === 'prev') {
      index = self.index - 1;
      if (index < 0) {
        index = self.playlist.length - 1;
      }
    } else {
      index = self.index + 1;
      if (index >= self.playlist.length) {
        index = 0;
      }
    }
    self.skipTo(index);
  },

  /**
   * Skip to a specific track based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  skipTo: function(index) {
    let self = this;

    // Stop the current track.
    if (self.playlist[self.index].howl) {
      self.playlist[self.index].howl.stop();
    }
    // playBtn.classList.remove('mute')

    // Play the new track.
    self.play(index);
  },

  /**
   * Set the volume and update the volume slider display.
   * @param  {Number} val Volume between 0 and 1.
   */
    volume: function(val) {

    // Update the global volume (affecting all Howls).
    Howler.volume(val);

  },

};
