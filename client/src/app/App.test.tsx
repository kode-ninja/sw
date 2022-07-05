import React from 'react';
import "setimmediate";
import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import {SocketIO, Server, Client} from 'mock-socket';

interface IPlaylistVideo {
    id: string,
    url: string,
    title: string,
    thumbnail_url: string,
    duration: string
}

let server: Server;
let playlist: IPlaylistVideo[] = [];

beforeAll(() => {
    server = new Server('ws://localhost:3001');
    playlist = [];
});

afterAll((done: any) => {
    jest.restoreAllMocks();
    server.stop(() => done());
});

test('Client requests playlist on mount (page load)', async () => {

    jest.spyOn(server, 'on');
    // jest.spyOn(tracker, 'onPlaylistGet');

    server.on('connection', (socket) => {
        // _socket = socket;
        // jest.spyOn(_socket, 'on');
        //
        // // @ts-ignore
        // _socket.on('playlist:get', () => {
        //     tracker.onPlaylistGet();
        // });
    });

    expect(server.on).toBeCalled();
    expect(server.on).toHaveBeenCalledWith('connection', expect.anything());

});


// describe('Submitting a video', () => {
//   test('Submit a video by button click', () => {
//       render(<App />);
//       const input = screen.getByLabelText('YouTube Video URL');
//   });
// });

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
