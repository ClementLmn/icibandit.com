import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class Bandeau {
    constructor(el) {
        this.el = el;
        this.inner = el.querySelector(".bandeau-inner");
        this.direction = this.el.getAttribute("data-direction") || "left";
        this.width = this.inner.clientWidth / 2;
        this.initAnimation();
    }

    initAnimation() {
        this.wrap = gsap.utils.wrap(-this.width, 0);
        this.tl = gsap.timeline({
            repeat: -1,
        });

        this.tl.to(this.inner, {
            x:
                this.direction === "left"
                    ? `-=${this.width}`
                    : `+=${this.width}`,
            ease: "linear",
            duration: 20,
            modifiers: {
                x: gsap.utils.unitize(this.wrap),
            },
        });

        this.speed = ScrollTrigger.create({
            trigger: this.el,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                const speedMultiplier = 1000;
                const velocity = Math.abs(self.getVelocity()) / speedMultiplier;
                this.tl.timeScale(1 + velocity);
            },
        });
    }

    onResize() {
        const newWidth = this.inner.clientWidth / 2;
        if (newWidth === this.width) return;
        this.width = this.inner.clientWidth / 2;
        this.wrap = gsap.utils.wrap(-this.width, 0);
        this.tl.kill();
        this.speed.kill();
        this.initAnimation();
    }
}
