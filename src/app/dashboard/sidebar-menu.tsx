import dgLogo from "@/assets/images/dg-logo.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { House } from "lucide-react";

import SideBardOptionHoverCard from "@/components/ui/sidebar-option-hover-card";
import SideBarUserButton from "@/components/ui/siderbar-user-button";

const SidebarMenu = () => {
  return (
    <div className="flex flex-row gap-2 items-center md:flex-col">
      <Button variant="ghost" className="size-[60px] p-[5px]">
        <Image src={dgLogo} alt="dg-notas-logo" />
      </Button>

      <SideBarUserButton />

      {/* exemplo de uso de menu */}
      <SideBardOptionHoverCard
        items={[
          {
            name: "Cadastrar Empresa",
            path: "/dashboard/empresa/cadastrar",
          },
          { name: "Listar Empresas", path: "/dashboard/empresa/listar" },
        ]}
      >
        <House className="size-full" />
      </SideBardOptionHoverCard>
    </div>
  );
};

export default SidebarMenu;
