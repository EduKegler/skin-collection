"use client";
import { memo, useCallback } from "react";
import { PrimaryButton } from "../PrimaryButton";
import { HR } from "flowbite-react";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/contants";

export const Home = memo(function Home() {
  const { push } = useRouter();

  const goToCollection = useCallback(() => {
    push(ROUTE.COLLECTION);
  }, [push]);

  return (
    <main className="flex flex-col flex-auto h-full px-8 py-6">
      <div className="flex flex-col w-[400px] py-16 pl-8 gap-8">
        <h1 className="text-7xl text-lol-gold">
          Catalogue suas skins de League of Legends
        </h1>
        <p className="text-xl text-lol-gold">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus nam mollitia non
          ipsam et qui animi delectus molestiae dolores esse
        </p>
        <PrimaryButton className="max-w-fit" size="md" onClick={goToCollection}>
          Comece Agora
        </PrimaryButton>
      </div>
      <div className="flex flex-col pt-8 pl-8 gap-8">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-7xl text-center">Funcionalidades</h1>
          <p className="text-xl w-[700px] text-center ">
            Descubra como o Skin Collection pode transformar a forma como você organiza e
            exibe suas skins
          </p>
        </div>
        <HR />
        <div className="flex gap-8">
          <article className="w-full">
            <h3>Olhando e pesquisando</h3>
            <p>
              Veja todas as suas skins organizadas por campeões de forma fácil e
              intuitiva.
            </p>
          </article>
          <article className="w-full">
            <h3>Estrelas de 1 a 5</h3>
            <p>
              Veja e veja avaliações detalhadas de outros jogadores para devidir quais
              skins colecionar.
            </p>
          </article>
          <article className="w-full">
            <h3>Filtros poderosos</h3>
            <p>
              Encontre exatamente o que você procura com filtros por skins coletadas, não
              coletadas, nível de raridade e muito mais.
            </p>
          </article>
        </div>
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-lg text-center">
            Experiment agora e veja como é fácil manter sua coleção sempre organizada!
          </h1>
          <PrimaryButton className="max-w-fit" size="md" onClick={goToCollection}>
            ENCONTRE SUAS SKINS
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
});
