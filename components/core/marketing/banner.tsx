import Link from "next/link";

export const Banner = () => {
  return (
    <aside className="bg-rose-500 flex flex-col gap-1 items-center justify-center p-4 text-white">
      <p className="font-bold">
        This is a new project currently in its Alpha stage.
      </p>
      <p>
        Please be aware that breaking changes may occur as I continue to
        develop and refine the components. I appreciate your understanding and{" "}
        <Link
          href="https://github.com/alamenai/vibrant-ui/issues"
          className="underline"
          target="_blank"
        >
          feedback
        </Link>{" "}
        during this phase!
      </p>
    </aside>
  );
};
