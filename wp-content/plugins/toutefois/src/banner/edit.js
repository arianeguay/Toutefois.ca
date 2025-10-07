import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
  ColorPalette,
  PanelBody,
  SelectControl,
  TextControl,
  ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
  const {
    title,
    description,
    image,
    font,
    verticalAlignment,
    horizontalAlignment,
    objectPosition,
    textColor,
    bigTextShadow,
    textShadowColor,
    template,
    blurredBackground,
    height,
    heightUnit,
    backgroundMode,
    backgroundColor,
    backgroundSvg,
    backgroundSvgColor,
  } = attributes;

  // Wrapper props with data-attributes for theme CSS hooks
  const wrapperProps = useBlockProps({
    className: "wp-block-toutefois-banner",
    style: {
      position: "relative",
      height: height || "350px",
      width: "100%",
      marginBottom: "24px",
    },
    "data-va": verticalAlignment,
    "data-ha": horizontalAlignment,
    "data-blurred": blurredBackground ? "1" : "0",
    "data-height": height,
    "data-height-unit": heightUnit,
    "data-background-mode": backgroundMode,
    "data-big-text-shadow": bigTextShadow ? "1" : "0",
    "data-background-svg": backgroundSvg ? "1" : "0",
  });

  // Background preview styles based on mode
  const bgBase = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  };

  let bgStyles = { ...bgBase };
  if (backgroundMode === "image") {
    bgStyles = {
      ...bgBase,
      backgroundImage: image?.url ? `url(${image.url})` : undefined,
      backgroundSize: "cover",
      backgroundPosition: objectPosition || "50% 50%",
      filter: blurredBackground ? "blur(4px)" : undefined,
      backgroundColor: image?.url ? undefined : backgroundColor || "#f0f0f0",
      border: image?.url ? undefined : "1px dashed #ccc",
    };
  } else if (backgroundMode === "color") {
    bgStyles = {
      ...bgBase,
      backgroundColor: backgroundColor || "#f0f0f0",
    };
  } else if (backgroundMode === "svg") {
    bgStyles = {
      ...bgBase,
      backgroundColor: backgroundColor || "transparent",
    };
  }

  const contentStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: horizontalAlignment,
    justifyContent: verticalAlignment,
    textAlign:
      horizontalAlignment === "flex-start"
        ? "left"
        : horizontalAlignment === "flex-end"
        ? "right"
        : "center",
    color: textColor,
  };

  const headingStyle = {
    width: "fit-content",
    fontFamily: font || "Poppins, sans-serif",
    textShadow: bigTextShadow
      ? `4px 3px 0px ${textShadowColor}`
      : `1px 1px 3px ${textShadowColor}`,
    margin: 0,
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Banner Settings", "toutefois")}>
          <TextControl
            label={__("Title", "toutefois")}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />
          <TextControl
            label={__("Description", "toutefois")}
            value={description}
            onChange={(value) => setAttributes({ description: value })}
          />
          <SelectControl
            label={__("Template", "toutefois")}
            value={template}
            onChange={(value) => setAttributes({ template: value })}
            options={[
              { label: "Default", value: "default" },
              { label: "No Margin", value: "no-margin" },
              { label: "With Banner", value: "with-banner" },
              { label: "With Title", value: "with-title" },
            ]}
          />
          <SelectControl
            label={__("Background Mode", "toutefois")}
            value={backgroundMode || "image"}
            onChange={(value) => setAttributes({ backgroundMode: value })}
            options={[
              { label: __("Image", "toutefois"), value: "image" },
              { label: __("Color", "toutefois"), value: "color" },
              { label: __("SVG", "toutefois"), value: "svg" },
            ]}
          />
          {backgroundMode !== "color" && (
            <ToggleControl
              label={__("Blurred Background", "toutefois")}
              checked={!!blurredBackground}
              onChange={(value) => setAttributes({ blurredBackground: value })}
              help={__("Applies to image backgrounds", "toutefois")}
            />
          )}
          {(backgroundMode === "color" || backgroundMode === "svg") && (
            <>
              <p>
                <strong>{__("Background Color", "toutefois")}</strong>
              </p>
              <ColorPalette
                value={backgroundColor}
                onChange={(value) => setAttributes({ backgroundColor: value })}
              />
            </>
          )}
          {backgroundMode === "svg" && (
            <SelectControl
              label={__("SVG Preset", "toutefois")}
              value={backgroundSvg ? "custom" : "wave"}
              options={[
                { label: __("Splash 1", "toutefois"), value: "splash1" },
                {
                  label: __("Splash 2", "toutefois"),
                  value: "splash2",
                },
                {
                  label: __("Splash 3", "toutefois"),
                  value: "splash3",
                },
              ]}
              onChange={(value) => {
                const presets = {
                  splash3:
                    '<svg preserveAspectRatio width="350px" viewBox="0 0 1073 985" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M479.93 56.5995C504.855 71.9894 525.052 84.9914 534.517 102.662C543.983 120.332 542.676 142.51 544.937 167.891C547.016 193.32 552.847 221.905 541.943 247.082C531.038 272.259 503.541 293.819 474.699 297.327C445.673 300.883 415.446 286.178 389.304 272.134C363.345 258.044 341.431 244.455 322.243 225.517C303.055 206.579 286.593 182.293 290.018 159.223C293.443 136.154 316.713 114.139 337.557 88.7979C358.584 63.4091 377.284 34.3231 401.298 28.797C425.495 23.2235 454.964 41.0486 479.93 56.5995Z" fill="currentColor"/><path d="M591.842 657.47C558.316 673.797 517.459 678.272 492.216 655.886C467.166 633.68 457.73 584.614 449.776 550.596C441.821 516.579 435.155 497.431 416.629 475.173C398.296 453.095 367.731 427.92 357.664 397.336C347.418 366.945 357.685 331.516 385.399 324.538C413.305 317.739 458.852 339.569 494.264 328.954C529.483 318.158 554.747 274.724 588.424 257.459C622.102 240.194 664.014 249.292 684.951 276.31C705.516 303.341 705.106 348.292 700.121 385.392C695.316 422.299 685.935 451.356 681.505 483.215C677.074 515.075 677.966 549.723 664.943 581.15C652.113 612.757 625.547 640.95 591.842 657.47Z" fill="currentColor"/><path d="M712.737 756.28C678.714 757.769 637.089 748.6 643.542 728.002C649.612 707.701 703.804 675.63 726.37 650.543C748.937 625.456 739.156 607.604 734.021 575.143C728.546 542.638 726.949 496.116 743.973 476.536C760.997 456.955 796.641 464.316 842.583 456.068C888.569 447.48 944.513 423.24 987.749 433.308C1030.98 443.376 1060.79 488.004 1060.39 533.923C1059.65 579.798 1028.38 626.921 990.431 653.482C952.484 680.042 907.911 685.702 879.529 688.955C851.147 692.208 839.338 692.76 828.438 699.65C817.922 706.244 808.314 719.176 790.513 731.398C772.712 743.62 746.378 755.087 712.737 756.28Z" fill="currentColor"/><path d="M335.281 486.422C360.298 482.067 379.71 522.954 391.278 558.101C403.177 593.162 407.563 622.399 425.571 653.76C443.578 685.122 475.294 718.941 484.738 758.169C494.514 797.311 481.772 842.28 450.065 860.373C418.774 878.712 368.185 870.26 320.732 890.309C273.278 910.357 228.715 959.323 185.708 965.154C142.37 971.071 100.761 934.516 87.6913 888.103C74.376 842.108 89.3546 786.671 76.0164 737.856C62.4326 689.458 20.2008 647.766 16.2258 607.829C12.3365 568.223 46.704 530.371 91.646 527.924C136.502 525.145 192.35 558.016 235.665 549.28C279.065 540.875 309.933 490.862 335.281 486.422Z" fill="currentColor"/></svg>',
                  splash2:
                    '<svg preserveAspectRatio width="350px" viewBox="0 0 638 741" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M262.287 227.477C275.869 266.679 255.881 317.923 254.856 358.918C253.574 399.913 271.256 430.403 265.106 452.694C258.699 474.729 228.461 488.309 193.354 510.6C157.991 532.891 118.015 563.638 81.8824 560.819C45.7502 557.745 13.2057 520.849 3.46791 481.647C-6.26984 442.702 6.79924 401.194 14.4869 358.918C22.1746 316.642 24.2247 273.34 46.7753 235.676C69.0696 198.012 112.121 165.728 156.966 163.166C201.81 160.603 248.962 188.019 262.287 227.477Z" fill="currentColor"/><path d="M502.083 508.628C522.358 529.771 538.653 547.418 543.39 566.897C548.127 586.375 541.306 607.518 537.137 632.656C532.779 657.795 531.263 686.929 514.4 708.572C497.536 730.214 465.514 744.199 436.713 740.369C407.722 736.54 382.142 714.731 360.352 694.587C338.751 674.443 320.94 655.797 307.108 632.656C293.276 609.516 283.423 581.88 292.518 560.404C301.613 538.928 329.656 523.445 356.183 504.133C382.9 484.822 408.29 461.348 432.923 462.014C457.745 462.68 481.809 487.319 502.083 508.628Z" fill="currentColor"/><path d="M430.244 406.374C393.697 413.782 353.022 407.879 334.192 379.884C315.504 352.11 318.66 302.245 319.481 267.319C320.302 232.394 318.646 212.186 306.287 185.997C294.069 160.03 270.785 128.001 268.701 95.8707C266.395 63.8818 285.21 32.1548 313.788 32.3416C342.508 32.7503 381.133 65.2948 418.075 63.8888C454.876 62.2607 490.215 26.5402 527.144 18.2626C564.073 9.98501 602.369 29.2922 615.87 60.6933C629.008 92.0143 617.35 135.429 603.23 170.098C589.332 204.624 572.971 230.405 560.701 260.138C548.43 289.872 540.614 323.639 520.133 350.801C499.794 378.186 467.013 398.824 430.244 406.374Z" fill="currentColor"/></svg>',
                  splash1:
                    '<svg preserveAspectRatio width="350px" viewBox="0 0 639 644" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M318.036 3.46634C351.589 -2.36133 394.045 1.40951 390.279 22.6634C386.855 43.5744 337.209 82.3112 318.036 110.078C298.862 137.845 310.845 154.3 320.09 185.838C329.677 217.376 337.209 263.312 322.829 284.908C308.449 306.505 272.156 303.763 227.645 317.818C183.135 332.215 130.75 363.41 86.582 358.954C42.4141 354.498 7.14829 314.047 1.6701 268.454C-3.4657 222.861 21.5285 172.126 55.7672 140.931C90.0059 109.736 133.489 98.423 161.222 91.5669C188.956 84.7109 200.597 82.654 210.526 74.4267C220.113 66.5423 227.988 52.4873 244.08 38.0895C260.172 23.6918 284.824 8.9512 318.036 3.46634Z" fill="currentColor"/><path d="M592.368 79.4578C614.397 102.451 632.104 121.642 637.251 142.824C642.398 164.007 634.986 186.999 630.457 214.337C625.721 241.675 624.074 273.359 605.75 296.895C587.426 320.431 552.632 335.639 521.337 331.475C489.837 327.31 462.042 303.593 438.365 281.687C414.894 259.78 395.541 239.503 380.511 214.337C365.482 189.172 354.776 159.118 364.658 135.763C374.541 112.408 405.012 95.571 433.836 74.5696C462.866 53.5682 490.454 28.0406 517.219 28.7648C544.19 29.489 570.338 56.2839 592.368 79.4578Z" fill="currentColor"/><path d="M447.197 561.591C431.629 573.808 401.194 570.382 375.228 580.252C349.028 590.284 327.371 613.216 304.905 616.384C282.637 619.588 260.028 602.706 234.58 585.703C208.898 568.861 180.61 551.738 179.49 529.259C178.21 506.545 203.936 478.242 215.725 451.222C227.353 423.969 224.649 397.925 235.35 381.123C246.05 364.321 269.956 356.722 294.13 345.496C318.267 334.468 342.871 319.848 370.842 315.664C398.615 311.443 430.152 317.73 450.416 336.218C470.483 354.669 479.672 385.395 480.119 413.674C480.528 442.15 472.664 467.858 468.245 494.821C463.665 521.55 462.766 549.374 447.197 561.591Z" fill="currentColor"/></svg>',
                };
                setAttributes({ backgroundSvg: presets[value] });
              }}
            />
          )}
          <SelectControl
            label={__("Font", "toutefois")}
            value={font}
            onChange={(value) => setAttributes({ font: value })}
            options={[
              { label: "Poppins", value: "Poppins" },
              { label: "Cerebri", value: "Cerebri" },
              { label: "Gagalin", value: "Gagalin" },
              { label: "Montserrat", value: "Montserrat" },
            ]}
          />
          <SelectControl
            label={__("Vertical Alignment", "toutefois")}
            value={verticalAlignment}
            onChange={(value) => setAttributes({ verticalAlignment: value })}
            options={[
              { label: "Top", value: "flex-start" },
              { label: "Center", value: "center" },
              { label: "Bottom", value: "flex-end" },
            ]}
          />
          <SelectControl
            label={__("Horizontal Alignment", "toutefois")}
            value={horizontalAlignment}
            onChange={(value) => setAttributes({ horizontalAlignment: value })}
            options={[
              { label: "Left", value: "flex-start" },
              { label: "Center", value: "center" },
              { label: "Right", value: "flex-end" },
            ]}
          />
          <p>
            <strong>{__("Text Color", "toutefois")}</strong>
          </p>
          <ColorPalette
            value={textColor}
            onChange={(value) => setAttributes({ textColor: value })}
          />
          <ToggleControl
            label={__("Big Text Shadow", "toutefois")}
            checked={bigTextShadow}
            onChange={() => setAttributes({ bigTextShadow: !bigTextShadow })}
          />
          <p>
            <strong>{__("Text Shadow Color", "toutefois")}</strong>
          </p>
          <ColorPalette
            value={textShadowColor}
            onChange={(value) => setAttributes({ textShadowColor: value })}
          />
          <div style={{ marginTop: "16px" }}>
            <TextControl
              label={__("Banner Height", "toutefois")}
              type="number"
              value={height?.replace ? height.replace(/[^0-9.]/g, "") : height}
              onChange={(value) => {
                const numValue = parseFloat(value);
                if (!isNaN(numValue) && numValue > 0) {
                  setAttributes({ height: `${numValue}${heightUnit}` });
                }
              }}
            />
            <SelectControl
              label={__("Height Unit", "toutefois")}
              value={heightUnit}
              options={[
                { label: "px", value: "px" },
                { label: "%", value: "%" },
                { label: "vh", value: "vh" },
                { label: "rem", value: "rem" },
              ]}
              onChange={(value) => {
                setAttributes({ heightUnit: value });
                const heightValue = height?.replace
                  ? parseFloat(height.replace(/[^0-9.]/g, ""))
                  : 350;
                setAttributes({ height: `${heightValue}${value}` });
              }}
            />
          </div>
        </PanelBody>
      </InspectorControls>
      <div {...wrapperProps}>
        <div className="toutefois-banner__bg" style={bgStyles}>
          {backgroundMode === "svg" && backgroundSvg && (
            <div
              className="toutefois-banner__bg-svg"
              style={{
                position: "absolute",
                inset: 0,
                bottom: -20,
                right: -30,
                color: backgroundSvgColor,
              }}
              dangerouslySetInnerHTML={{ __html: backgroundSvg }}
            />
          )}
        </div>
        <div className="toutefois-banner__content" style={contentStyles}>
          <div
            className="toutefois-banner__body"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              alignItems: horizontalAlignment,
              justifyContent: verticalAlignment,
              textAlign:
                horizontalAlignment === "flex-start"
                  ? "left"
                  : horizontalAlignment === "flex-end"
                  ? "right"
                  : "center",
              color: textColor,
            }}
          >
            <h1 className="toutefois-banner__title" style={headingStyle}>
              {title}
            </h1>
            <p
              className="toutefois-banner__description"
              style={{ width: "fit-content" }}
            >
              {description}
            </p>
            {backgroundMode === "image" && !image && (
              <p style={{ marginTop: "8px", opacity: 0.8 }}>
                {__("Please select an image", "toutefois")}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
