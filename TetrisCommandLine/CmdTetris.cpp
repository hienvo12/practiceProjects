

#include "pch.h"

#include <iostream>
#include <thread>
#include <vector>
#include <stdio.h>
#include <Windows.h>
#include <string>
using namespace std;

int nScreenWidth = 80;			// Console Screen Size X (columns)
int nScreenHeight = 30;			// Console Screen Size Y (rows)
int nFieldWidth = 12;
int nFieldHeight = 18;
int nScore = 0;
unsigned char *pField = nullptr;
bool bGameOver = false;
wstring TetrisBlock[7];


int Rotate(int px, int py, int r)
{
	int pi = 0;
	switch (r % 4)
	{
	case 0: // 0 degrees			// 0  1  2  3
		pi = py * 4 + px;		// 4  5  6  7
		break;				// 8  9 10 11
						//12 13 14 15

	case 1: // 90 degrees			//12  8  4  0
		pi = 12 + py - (px * 4);	//13  9  5  1
		break;				//14 10  6  2
						//15 11  7  3

	case 2: // 180 degrees			//15 14 13 12
		pi = 15 - (py * 4) - px;	//11 10  9  8
		break;				// 7  6  5  4
						// 3  2  1  0

	case 3: // 270 degrees			// 3  7 11 15
		pi = 3 - py + (px * 4);		// 2  6 10 14
		break;				// 1  5  9 13
	}					// 0  4  8 12

	return pi;
}
bool DoesPieceFit(int nTetromino, int nRotation, int nPosX, int nPosY)
{
	// All Field cells >0 are occupied
	for (int px = 0; px < 4; px++)
		for (int py = 0; py < 4; py++)
		{
			// Get index into piece
			int pi = Rotate(px, py, nRotation);

			// Get index into field
			int fi = (nPosY + py) * nFieldWidth + (nPosX + px);

			// Check that test is in bounds. Note out of bounds does
			// not necessarily mean a fail, as the long vertical piece
			// can have cells that lie outside the boundary, so we'll
			// just ignore them
			if (nPosX + px >= 0 && nPosX + px < nFieldWidth)
			{
				if (nPosY + py >= 0 && nPosY + py < nFieldHeight)
				{
					// In Bounds so do collision check
					if (TetrisBlock[nTetromino][pi] != L'.' && pField[fi] != 0)
						return false; // fail on first hit
				}
			}
		}

	return true;
}
//MAIN
int main()
{
	// Create Screen Buffer
	wchar_t *screen = new wchar_t[nScreenWidth*nScreenHeight];
	for (int i = 0; i < nScreenWidth*nScreenHeight; i++) screen[i] = L' ';
	HANDLE hConsole = CreateConsoleScreenBuffer(GENERIC_READ | GENERIC_WRITE, 0, NULL, CONSOLE_TEXTMODE_BUFFER, NULL);
	SetConsoleActiveScreenBuffer(hConsole);
	DWORD dwBytesWritten = 0;

	//create board values
	pField = new unsigned char[nFieldWidth*nFieldHeight]; // Create play field buffer
	for (int x = 0; x < nFieldWidth; x++) 
		for (int y = 0; y < nFieldHeight; y++)
			pField[y*nFieldWidth + x] = (x == 0 || x == nFieldWidth - 1 || y == nFieldHeight - 1) ? 9 : 0; // Board Boundary
	
	//tetris blocks
	TetrisBlock[0].append(L"..X...X...X...X.");
	TetrisBlock[1].append(L"..X..XX...X.....");
	TetrisBlock[2].append(L".....XX..XX.....");
	TetrisBlock[3].append(L"..X..XX..X......");
	TetrisBlock[4].append(L".X...XX...X.....");
	TetrisBlock[5].append(L".X...X...XX.....");
	TetrisBlock[6].append(L"..X...X..XX.....");

	//Game logic
	int nCurrentPiece = 0;
	int nCurrentX = nFieldWidth / 2;
	int nCurrentY = 0;
	int nPieceCount = 0;
	int nCurrentRotation = 0;
	int nSpeedCount = 0;
	int nSpeed = 20;
	bool bForceDown = false;
	int bKeys[4];
	bool bRotateHold = true;
	vector<int> vLines;
	int nextBlock = 0;
	int Level = 1;
	int levelscore = 0;
	//random piece
	nCurrentPiece = rand() % 7;
	nextBlock = rand() & 7;
	while (!bGameOver) // Main Loop
	{
		// Timing =======================
		this_thread::sleep_for(50ms); // Small Step = 1 Game Tick
		nSpeedCount++;
		bForceDown = (nSpeedCount == nSpeed);

		//input
		for (int k = 0; k < 4; k++) {
			bKeys[k] = (0x8000 & GetAsyncKeyState((unsigned char)("\x27\x25\x28Z"[k]))) != 0;
		}
		//game logic

		nCurrentX += (bKeys[0] && DoesPieceFit(nCurrentPiece, nCurrentRotation, nCurrentX + 1, nCurrentY)) ? 1 : 0;
		nCurrentX -= (bKeys[1] && DoesPieceFit(nCurrentPiece, nCurrentRotation, nCurrentX - 1, nCurrentY)) ? 1 : 0;
		nCurrentY += (bKeys[2] && DoesPieceFit(nCurrentPiece, nCurrentRotation, nCurrentX, nCurrentY + 1)) ? 1 : 0;


		if (bKeys[3]) {
			nCurrentRotation += (bRotateHold && DoesPieceFit(nCurrentPiece, nCurrentRotation + 1, nCurrentX, nCurrentY)) ? 1 : 0;
			bRotateHold = false;
		}
		else {
			bRotateHold = true;
		}

		if (bForceDown) {
			nSpeedCount = 0;
			nPieceCount++;
			if (DoesPieceFit(nCurrentPiece, nCurrentRotation, nCurrentX, nCurrentY + 1))
				nCurrentY++; // It can, so do it!
			else {
				// It can't! Lock the piece in place
				for (int px = 0; px < 4; px++)
					for (int py = 0; py < 4; py++)
						if (TetrisBlock[nCurrentPiece][Rotate(px, py, nCurrentRotation)] != L'.') {
							pField[(nCurrentY + py) * nFieldWidth + (nCurrentX + px)] = nCurrentPiece + 1;//move pField up one space vertically from the piece location	

						}
				//check for completed lines
				for (int py = 0; py < 4; py++)
					if (nCurrentY + py < nFieldHeight - 1)
					{
						bool bLine = true;
						for (int px = 1; px < nFieldWidth - 1; px++)
							bLine &= (pField[(nCurrentY + py) * nFieldWidth + px]) != 0;

						if (bLine)
						{
							// Remove Line, set to =
							for (int px = 1; px < nFieldWidth - 1; px++)
								pField[(nCurrentY + py) * nFieldWidth + px] = 8;
							vLines.push_back(nCurrentY + py);
						}
					}
				//Score
				int scoreMulti = 1;
				for (int i = 1; i <= vLines.size(); ++i) {
					scoreMulti *= i;
				}
				if (vLines.size() == 1) { if (!vLines.empty()) { nScore += (100); levelscore += (100); } }
				else if (vLines.size() == 2) { if (!vLines.empty()) { nScore += (100 + vLines.size() * 100); levelscore += (100 + vLines.size() * 100); } }
				else {
					if (!vLines.empty()) { nScore += ((scoreMulti * 100)); levelscore += ((scoreMulti * 100)); } 
				}
				if (levelscore >= 1000) {
					Level += 1;
				}
				//Reset Conditions
				nCurrentX = nFieldWidth / 2;
				nCurrentY = 0;
				nCurrentRotation = 0;
				nCurrentPiece = nextBlock;
				nextBlock = rand() % 7;
				//Game over if peice does not fit right away
				bGameOver = !DoesPieceFit(nCurrentPiece, nCurrentRotation, nCurrentX, nCurrentY);
			}	
		}
		//Draw field
		for (int x = 0; x < nFieldWidth; x++)
			for (int y = 0; y < nFieldHeight; y++)
				screen[(y + 2)*nScreenWidth + (x + 2)] = L" ABCDEFG=*"[pField[y*nFieldWidth + x]];

		// Draw Current Piece
		for (int px = 0; px < 4; px++)
			for (int py = 0; py < 4; py++) 
				if (TetrisBlock[nCurrentPiece][Rotate(px, py, nCurrentRotation)] != L'.') { 
					screen[(nCurrentY + py + 2)*nScreenWidth + (nCurrentX + px + 2)] = nCurrentPiece + 65;
				}
		//draw Current block
		for (int x = 0; x < 15; x++) {
			screen[2 * nScreenWidth + 18 + x] = L"Current Block: "[x];
		}
		switch (nCurrentPiece) {
		case 0:
			for (int x = 0; x < 6; x++) {
				screen[2 * nScreenWidth + 18 + 15 + x] = L"L pipe"[x];
			}
			break;
		case 1:
			for (int x = 0; x < 5; x++) {
				screen[2 * nScreenWidth + 18 + 15 + x] = L"Cross"[x];
			}
			break;
		case 2:
			for (int x = 0; x < 6; x++) {
				screen[2 * nScreenWidth + 18 + 15 + x] = L"Square"[x];
			}
			break;
		case 3:
			for (int x = 0; x < 7; x++) {
				screen[2 * nScreenWidth + 18 + 15 + x] = L"Z Shape"[x];
			}
			break;
		case 4:
			for (int x = 0; x < 7; x++) {
				screen[2 * nScreenWidth + 18 + 15 + x] = L"Z Shape"[x];
			}
			break;
		case 5:
			for (int x = 0; x < 7; x++) {
				screen[2 * nScreenWidth + 18 + 15 + x] = L"L Shape"[x];
			}
			break;
		case 6:
			for (int x = 0; x < 7; x++) {
				screen[2 * nScreenWidth + 18 + 15 + x] = L"L Shape"[x];
			}
			break;
		}
		//draw next block	
		for (int x = 0; x < 12; x++) {
			screen[4*nScreenWidth + 18 + x] = L"Next Block: "[x];
		}
		switch(nextBlock){
		case 0:
			for (int x = 0; x < 6; x++) {
				screen[4 * nScreenWidth + 18 + 12 + x] = L"L pipe"[x];
			}
			break;
		case 1:
			for (int x = 0; x < 5; x++) {
				screen[4 * nScreenWidth + 18 + 12 + x] = L"Cross"[x];
			}
			break;
		case 2:
			for (int x = 0; x < 6; x++) {
				screen[4 * nScreenWidth + 18 + 12 + x] = L"Square"[x];
			}
			break;
		case 3:
			for (int x = 0; x < 7; x++) {
				screen[4 * nScreenWidth + 18 + 12 + x] = L"Z Shape"[x];
			}
			break;
		case 4:
			for (int x = 0; x < 7; x++) {
				screen[4 * nScreenWidth + 18 + 12 + x] = L"Z Shape"[x];
			}
			break;
		case 5:
			for (int x = 0; x < 7; x++) {
				screen[4 * nScreenWidth + 18 + 12 + x] = L"L Shape"[x];
			}
			break;
		case 6:
			for (int x = 0; x < 7; x++) {
				screen[4 * nScreenWidth + 18 + 12 + x] = L"L Shape"[x];
			}
			break;
		}
		//draw level
		for (int x = 0; x < 7; x++) {
			screen[6 * nScreenWidth + 18 + x] = L"Level: "[x];
		}
		

		// Draw Score with swprintf_s
		swprintf_s(&screen[8 * nScreenWidth + nFieldWidth + 6], 16, L"SCORE: %8d", nScore);
		
		// Animate Line Completion
		if (!vLines.empty())
		{
			// Display Frame 
			WriteConsoleOutputCharacter(hConsole, screen, nScreenWidth * nScreenHeight, { 0,0 }, &dwBytesWritten);
			this_thread::sleep_for(400ms); // Delay a bit

			for (auto &v : vLines)
				for (int px = 1; px < nFieldWidth - 1; px++)
				{
					for (int py = v; py > 0; py--)
						pField[py * nFieldWidth + px] = pField[(py - 1) * nFieldWidth + px];
					pField[px] = 0;
				}

			vLines.clear();
		}
		//Draw Frame
		WriteConsoleOutputCharacter(hConsole, screen, nScreenWidth * nScreenHeight, { 0,0 }, &dwBytesWritten);
	}



	//Game over screen
	CloseHandle(hConsole);
	cout << "Game Over! Score: " << nScore << endl;
	system("pause");

	return 0;
}
