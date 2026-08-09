import robot from "@/assets/robot.png";

export function Robot({ size = 160, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={robot}
      alt="Guía IA, robot mentor de ImpulsaIA"
      width={768}
      height={768}
      style={{ width: size, height: size }}
      className={`object-contain drop-shadow-[0_10px_30px_rgba(179,207,229,0.25)] ${className}`}
    />
  );
}
