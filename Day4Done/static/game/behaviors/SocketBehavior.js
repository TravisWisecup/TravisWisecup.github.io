import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"
import Input from "../../engine/base/Input.js";

export default class SocketBehavior extends Base.Behavior {
    speed = 12;
    movement = {
        x: 0,
        y: 0
      }

    start() {
    }
    update() {
        this.movement.x = 0;
        this.movement.y = 0;
        
        if (Input.keys['w'] && this.gameObject.y > -120) {
            this.movement.y -= this.speed
        }
        if( Input.keys['s'] && this.gameObject.y < 160) {
            this.movement.y += this.speed
        }
        if (Input.keys['a'] && this.gameObject.x > -1200) {
            this.movement.x -= this.speed
        }
        if( Input.keys['d'] && this.gameObject.x < 1200) {
            this.movement.x += this.speed
        }
        jQuery(function($){
            var socket = io.connect('http://localhost');

            socket.emit('movement', this.movement);

        });
    }
}