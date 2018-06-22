import * as React from "react";

export const Frame: React.SFC = ({children}) => (
    <section className="frame">
        <style jsx>{`
            border: 1px solid grey;
        `}</style>
        {children}
    </section>
);

export const Container: React.SFC = ({children}) => (
    <div className="container">
        <style jsx>{`
            padding-top: 20px;
            margin: 0 auto;
            max-width: 800px;
        `}</style>
        {children}
    </div>
);

export const Divider: React.SFC = () => (
    <div>
        <style jsx>{`
            width: 100%;
            border-bottom: 1px solid grey;
        `}</style>
    </div>
);

interface WindowProps {
    title: string;
}

export const Window: React.SFC<WindowProps> = ({title, children}) => (
    <Frame>
        <h2>
            <style jsx>{`
            padding: 12px;
            `}</style>
            {title}
        </h2>
        <Divider/>
        <div>
            <style jsx>{`
            padding: 12px;
            `}</style>
            {children}
        </div>
    </Frame>
);

export const Header: React.SFC<any> = ({}) => (
    <header>
        <h1>
            <style jsx global>{`
            body {margin: 0;}
            `}</style>
            <style jsx>{`
            padding-left: 12px;
            `}</style>
            INOチャット
        </h1>
        <Divider/>
    </header>
);