import { ArrowUpRight, Code2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { productLinks } from "@/content";

type ProductLinksProps = {
  showNpm?: boolean;
};

export function ProductLinks({ showNpm = true }: ProductLinksProps) {
  return (
    <div className="product-links">
      <Button asChild variant="outline">
        <a href={productLinks.github} rel="noreferrer" target="_blank">
          <Code2 data-icon="inline-start" />
          GitHub
        </a>
      </Button>
      {showNpm ? (
        <Button asChild>
          <a href={productLinks.npm} rel="noreferrer" target="_blank">
            npm
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      ) : null}
    </div>
  );
}
