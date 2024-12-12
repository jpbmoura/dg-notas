import dgLogo from "@/assets/images/dg-logo.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Building2, FileText, House, ShoppingBag } from "lucide-react";

import SideBarUserButton from "@/components/ui/siderbar-user-button";
import SideBardOptionHoverCard from "@/components/ui/sidebar-option-hover-card";

const SidebarMenu = () => {
  return (
    <div className="flex flex-row gap-4 items-center md:flex-col ">
      <Button variant="ghost" className="size-[60px] p-[5px]">
        <Image src={dgLogo} alt="dg-notas-logo" />
      </Button>

      <SideBarUserButton />

      {/* exemplo de uso de menu */}
      <SideBardOptionHoverCard items={[{ name: "Início", path: "#" }]}>
        <House className="size-full" />
      </SideBardOptionHoverCard>

      <SideBardOptionHoverCard
        items={[{ name: "Empresas", path: "/dashboard/empresa" }]}
      >
        <Building2 className="size-full" />
      </SideBardOptionHoverCard>
      <SideBardOptionHoverCard items={[{ name: "Produtos", path: "#" }]}>
        <ShoppingBag className="size-full" />
      </SideBardOptionHoverCard>
      <SideBardOptionHoverCard items={[{ name: "Notas", path: "#" }]}>
        <FileText className="size-full" />
      </SideBardOptionHoverCard>
    </div>
  );
};

export default SidebarMenu;
