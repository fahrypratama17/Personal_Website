import { AceternityIcon, CardReveal } from "@/shared/components/CardReveal";
import { CanvasRevealEffect } from "@/shared/components/CanvasReveal";

const Reality = () => {
  return (
    <section className="section">
      <h1 className="font-heading heading text-6xl text-white">
        How I Turn Ideas <span className="text-violet-300">into Reality</span>
      </h1>
      <div className="mx-auto mt-20 grid w-[85%] grid-cols-3 items-center justify-center gap-x-20 gap-y-12 py-12">
        <CardReveal
          title="Planning & Strategy"
          icon={<AceternityIcon order="Phase 1" />}
          desc="We'll collaborate to map out your website's goals, target audience,
          and key functionalities. We'll discuss things like site structure,
          navigation, and content requirements."
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
          />
        </CardReveal>
        <CardReveal
          title="Development & Progress Update"
          icon={<AceternityIcon order="Phase 2" />}
          desc="Once we agree on the plan, I cue my lofi playlist and dive into
          coding. From initial sketches to polished code, I keep you updated
          every step of the way."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-pink-900 rounded-3xl overflow-hidden"
            colors={[
              [255, 166, 158],
              [221, 255, 247],
            ]}
            dotSize={2}
          />
        </CardReveal>
        <CardReveal
          title="Development & Launch"
          icon={<AceternityIcon order="Phase 3" />}
          desc="This is where the magic happens! Based on the approved descign,
          I'll translate everything into functional code, building your website
          from the ground up."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
            colors={[[125, 211, 252]]}
          />
        </CardReveal>
      </div>
    </section>
  );
};

export default Reality;
