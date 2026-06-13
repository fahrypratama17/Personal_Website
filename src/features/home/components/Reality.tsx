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
          title="Research & Strategy"
          icon={<AceternityIcon order="Phase 1" />}
          desc="I begin by understanding the project's goals, target users, and technical requirements. This phase lays the foundation for building meaningful and effective digital solutions."
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
          />
        </CardReveal>
        <CardReveal
          title="Build & Iterate"
          icon={<AceternityIcon order="Phase 2" />}
          desc="Turning concepts into reality, I develop features incrementally while continuously refining the user experience, code quality, and overall system architecture."
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
          title="Launch & Improve"
          icon={<AceternityIcon order="Phase 3" />}
          desc="After rigorous testing and optimization, I deploy the application and monitor its performance, making improvements to ensure long-term scalability and success."
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
