from pathlib import Path

from PIL import Image, ImageDraw


PALETTE = {
    "background": (11, 31, 51, 255),  # #0b1f33
    "background_glow": (26, 55, 83, 255),
    "wing": (14, 20, 36, 255),
    "wing_highlight": (32, 54, 82, 255),
    "chart_bar": (244, 198, 69, 255),  # #f4c645
    "chart_line": (86, 196, 255, 255),  # #56c4ff
    "spark": (255, 255, 255, 255),
}


def draw_icon(size: int, output: Path) -> None:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    center = size / 2
    radius = size * 0.46

    # Background circle with subtle glow
    draw.ellipse(
        [
            (center - radius, center - radius),
            (center + radius, center + radius),
        ],
        fill=PALETTE["background"],
    )

    glow_radius = radius * 0.82
    draw.ellipse(
        [
            (center - glow_radius, center - glow_radius),
            (center + glow_radius, center + glow_radius),
        ],
        fill=PALETTE["background_glow"],
    )

    # Chart bars
    bar_width = size * 0.045
    base_y = center + radius * 0.35
    spacing = bar_width * 1.6
    heights = [radius * h for h in (0.32, 0.5, 0.4)]
    start_x = center - spacing
    for i, height in enumerate(heights):
        x0 = start_x + i * spacing
        draw.rounded_rectangle(
            [
                (x0 - bar_width / 2, base_y - height),
                (x0 + bar_width / 2, base_y),
            ],
            radius=bar_width * 0.3,
            fill=PALETTE["chart_bar"],
        )

    # Line chart overlay
    line_points = [
        (center - spacing * 1.4, base_y - radius * 0.15),
        (center - spacing * 0.4, base_y - radius * 0.38),
        (center + spacing * 0.6, base_y - radius * 0.2),
        (center + spacing * 1.4, base_y - radius * 0.45),
    ]
    draw.line(line_points, fill=PALETTE["chart_line"], width=int(size * 0.022))
    for point in line_points:
        draw.ellipse(
            [
                (point[0] - bar_width * 0.6, point[1] - bar_width * 0.6),
                (point[0] + bar_width * 0.6, point[1] + bar_width * 0.6),
            ],
            fill=PALETTE["chart_line"],
        )

    # Bat silhouette
    def scale(points):
        return [
            (
                center + (x - 256) * (size / 512),
                center + (y - 256) * (size / 512),
            )
            for x, y in points
        ]

    bat_points = scale(
        [
            (256, 188),
            (236, 200),
            (210, 192),
            (180, 170),
            (150, 184),
            (128, 210),
            (110, 240),
            (148, 235),
            (182, 262),
            (198, 298),
            (226, 282),
            (256, 304),
            (286, 282),
            (314, 298),
            (330, 262),
            (364, 235),
            (402, 240),
            (384, 210),
            (362, 184),
            (332, 170),
            (302, 192),
            (276, 200),
        ]
    )

    draw.polygon(bat_points, fill=PALETTE["wing"])

    ear_width = size * 0.05
    ear_height = size * 0.08
    ear_offset = size * 0.045
    draw.polygon(
        [
            (center - ear_offset - ear_width / 2, center - radius * 0.35),
            (center - ear_offset, center - radius * 0.55),
            (center - ear_offset + ear_width / 2, center - radius * 0.35),
        ],
        fill=PALETTE["wing_highlight"],
    )
    draw.polygon(
        [
            (center + ear_offset - ear_width / 2, center - radius * 0.35),
            (center + ear_offset, center - radius * 0.55),
            (center + ear_offset + ear_width / 2, center - radius * 0.35),
        ],
        fill=PALETTE["wing_highlight"],
    )

    # Sparks
    spark_radius = size * 0.018
    spark_positions = [
        (center + radius * 0.55, center - radius * 0.25),
        (center + radius * 0.35, center - radius * 0.45),
        (center + radius * 0.65, center - radius * 0.05),
    ]
    for sx, sy in spark_positions:
        draw.ellipse(
            [
                (sx - spark_radius, sy - spark_radius),
                (sx + spark_radius, sy + spark_radius),
            ],
            fill=PALETTE["spark"],
        )

    img.save(output)


def main():
    output_dir = Path(__file__).resolve().parent
    output_dir.mkdir(parents=True, exist_ok=True)

    for size in (512, 256, 128, 64, 32):
        filename = output_dir / f"favico_batstats_{size}.png"
        draw_icon(size, filename)

    # default favicon
    draw_icon(64, output_dir / "favico_batstats.png")


if __name__ == "__main__":
    main()
