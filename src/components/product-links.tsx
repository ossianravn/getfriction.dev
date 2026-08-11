import { SiGithub, SiNpm } from "@icons-pack/react-simple-icons";

import { Button } from "@/components/ui/button";
import { productLinks } from "@/content";

type ProductLinksProps = {
  showNpm?: boolean;
};

export function ProductLinks({ showNpm = true }: ProductLinksProps) {
  return (
    <div className="product-links">
      <Button asChild className="size-10" size="icon-lg" variant="outline">
        <a href={productLinks.github} rel="noreferrer" target="_blank">
          <SiGithub aria-hidden="true" className="size-[1.125rem]" />
          <span className="visually-hidden">
            View Friction on GitHub - opens in a new tab
          </span>
        </a>
      </Button>
      {showNpm ? (
        <Button asChild className="size-10" size="icon-lg">
          <a href={productLinks.npm} rel="noreferrer" target="_blank">
            <SiNpm aria-hidden="true" className="size-5" />
            <span className="visually-hidden">
              View the Friction package on npm - opens in a new tab
            </span>
          </a>
        </Button>
      ) : null}
    </div>
  );
}
