/***********************************************
 * This program Writes Tic Tac Toe by using 
 * boolean variables to switch between game 
 * mechanics. Game Ai works based on Windows.System random() 
 * function and hard coded shortest path algorithm 
 * using if else statements
 * **********************************************************
*/

//#define My_Debug

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Media;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Tic_Tac_Toe.Properties;





namespace Tic_Tac_Toe
{
	public partial class Form1 : Form
	{


#if My_Debug
		int _cursX = 0;
		int _cursY = 0;
#endif

		//Variables
		int wins = 0, losses = 0;
		X _x1, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9;
		Y _y1, _y2, _y3, _y4, _y5, _y6, _y7, _y8, _y9;
		//Hitbox, h1 for check, h2 for x
		bool[] hit1 = { false, false, false, false, false, false, false, false, false };
		bool[] hit2 = { false, false, false, false, false, false, false, false, false };
		bool[] clicked = { false, false, false, false, false, false, false, false, false };
		bool gameover = false, _Start = false, w1 = true;
		bool Turn = true, winTrigger = false, loseTrigger = false, _stale = false;
		Random rnd = new Random();
		//

		public Form1()
		{
			InitializeComponent();

			//initialize x marks
			{
				_x1 = new X() { Left = 155, Top = 90 };
				_x2 = new X() { Left = 255, Top = 90 };
				_x3 = new X() { Left = 365, Top = 90 };
				_x4 = new X() { Left = 155, Top = 205 };
				_x5 = new X() { Left = 255, Top = 205 };
				_x6 = new X() { Left = 365, Top = 205 };
				_x7 = new X() { Left = 155, Top = 305 };
				_x8 = new X() { Left = 255, Top = 305 };
				_x9 = new X() { Left = 365, Top = 305 };
			}
			//check marks
			{
				_y1 = new Y() { Left = 155, Top = 90 };
				_y2 = new Y() { Left = 255, Top = 90 };
				_y3 = new Y() { Left = 365, Top = 90 };
				_y4 = new Y() { Left = 155, Top = 205 };
				_y5 = new Y() { Left = 255, Top = 205 };
				_y6 = new Y() { Left = 365, Top = 205 };
				_y7 = new Y() { Left = 155, Top = 305 };
				_y8 = new Y() { Left = 255, Top = 305 };
				_y9 = new Y() { Left = 365, Top = 305 };
			}

			
		}

		private void StartGame()
		{
			//hardcode initialize
			hit1[0] = false; hit1[1] = false; hit1[2] = false;
			hit1[3] = false; hit1[4] = false; hit1[5] = false;
			hit1[6] = false; hit1[7] = false; hit1[8] = false;
			hit2[0] = false; hit2[1] = false; hit2[2] = false;
			hit2[3] = false; hit2[4] = false; hit2[5] = false;
			hit2[6] = false; hit2[7] = false; hit2[8] = false;
			clicked[0] = false; clicked[1] = false; clicked[2] = false;
			clicked[3] = false; clicked[4] = false; clicked[5] = false;
			clicked[6] = false; clicked[7] = false; clicked[8] = false;
			//reset
			gameover = false; _Start = false; winTrigger = false; loseTrigger = false; _stale = false; w1 = true;
		}

		private void Timer1_Tick(object sender, EventArgs e)
		{
			
			//check for game over
			if (gameover == true){ if (_Start == true) { StartGame(); } }
			else
			{
				//win conditions
				{
					if (hit1[0] && hit1[1] && hit1[2] == true)
					{
						gameover = true; wins++; quack(); Turn = true; winTrigger = true;
					}
					if (hit1[3] && hit1[4] && hit1[5] == true)
					{
						gameover = true; wins++; quack(); Turn = true; winTrigger = true; _Start = false;
					}
					if (hit1[6] && hit1[7] && hit1[8] == true)
					{ 
						gameover = true; wins++; quack(); Turn = true; winTrigger = true; _Start = false;
					}
					if (hit1[0] && hit1[3] && hit1[6] == true)
					{
						gameover = true; wins++; quack(); Turn = true; winTrigger = true; _Start = false;
					}
					if (hit1[1] && hit1[4] && hit1[7] == true)
					{
						gameover = true; wins++; quack(); Turn = true; winTrigger = true; _Start = false;
					}
					if (hit1[2] && hit1[5] && hit1[8] == true)
					{
						gameover = true; wins++; quack(); Turn = true; winTrigger = true; _Start = false;
					}
					if (hit1[2] && hit1[4] && hit1[6] == true)
					{
						gameover = true; wins++; quack(); Turn = true; winTrigger = true; _Start = false;
					}
					if (hit1[0] && hit1[4] && hit1[8] == true)
					{
						gameover = true; wins++; quack(); Turn = true; winTrigger = true; _Start = false;
					}
				}
				//Lose Conditions
				{
					if (hit2[0] && hit2[1] && hit2[2] == true) 
					{
						gameover = true; losses++; s2(); loseTrigger = true;
					}
					if (hit2[3] && hit2[4] && hit2[5] == true)
					{
						gameover = true; losses++; s2(); loseTrigger = true;
					}
					if (hit2[6] && hit2[7] && hit2[8] == true)
					{
						gameover = true; losses++; s2(); loseTrigger = true;
					}
					if (hit2[0] && hit2[3] && hit2[6] == true) 
					{
						gameover = true; losses++; s2(); loseTrigger = true;
					}
					if (hit2[1] && hit2[4] && hit2[7] == true) 
					{
						gameover = true; losses++; s2(); loseTrigger = true;
					}
					if (hit2[2] && hit2[5] && hit2[8] == true) 
					{
						gameover = true; losses++; s2(); loseTrigger = true;
					}
					if (hit2[2] && hit2[4] && hit2[6] == true)
					{
						gameover = true; losses++; s2(); loseTrigger = true;
					}
					if (hit2[0] && hit2[4] && hit2[8] == true)
					{
						gameover = true; losses++; s2(); loseTrigger = true;
					}
				}
				//StaleMate
				if(clicked[0] && clicked[1] && clicked[2] && clicked[3] && clicked[4] && clicked[5] && clicked[6] && clicked[7] && clicked[8]){gameover = true; Turn = true; _stale = true; }
					

				//Cpu takes Turn
				if (Turn == false)
				{
					//Simple AI
					//pause for effect
					System.Threading.Thread.Sleep(400);
					CPUPossibleRoute();
				}
				else { }
			}
			
			this.Refresh();
		}

		private void randomAI()
		{
			System.Threading.Thread.Sleep(400);
			int randnum = 0;
			bool gen = true;
			do
			{
				randnum = rnd.Next(0, 9);
				if (hit1[randnum] || hit2[randnum] == true) { }
				else
				{
					gen = false;
					hit2[randnum] = true;
					clicked[randnum] = true;
					s1();
				}
			} while (gen == true);
			Turn = true;
		}
		//rudimentary shortest path
		private void CPUPossibleRoute()
		{
			if (hit1[0] == false && hit1[1] ==false && hit1[2] == false) 
			{
				
				if(clicked[0] == false) { hit2[0] = true;clicked[0] = true;s1(); }
				else if(clicked[1] == false) { hit2[1] = true; clicked[1] = true; s1(); }
				else if (clicked[2] == false) { hit2[2] = true; clicked[2] = true; s1(); }
				//
				Turn = true;
			}
			else if (hit1[3] ==false && hit1[4] == false&& hit1[5] == false)
			{
				if (clicked[3] == false) { hit2[3] = true; clicked[3] = true; s1(); }
				else if (clicked[4] == false) { hit2[4] = true; clicked[4] = true; s1(); }
				else if (clicked[5] == false) { hit2[5] = true; clicked[5] = true; s1(); }
				//
				Turn = true;
			}
			else if (hit1[6] == false && hit1[7] && hit1[8] == false)
			{
				if (clicked[6] == false) { hit2[6] = true; clicked[6] = true; s1(); }
				else if (clicked[7] == false) { hit2[7] = true; clicked[7] = true; s1(); }
				else if (clicked[8] == false) { hit2[8] = true; clicked[8] = true; s1(); }
				//
				Turn = true;
			}
			else if (hit1[0] == false && hit1[3] == false && hit1[6] == false)
			{
				if (clicked[0] == false) { hit2[0] = true; clicked[0] = true; s1(); }
				else if (clicked[3] == false) { hit2[3] = true; clicked[3] = true; s1(); }
				else if (clicked[8] == false) { hit2[8] = true; clicked[8] = true; s1(); }
				//
				Turn = true;
			}
			else if (hit1[1] == false && hit1[4] == false && hit1[7] == false)
			{
				if (clicked[1] == false) { hit2[1] = true; clicked[1] = true; s1(); }
				else if (clicked[4] == false) { hit2[4] = true; clicked[4] = true; s1(); }
				else if (clicked[7] == false) { hit2[7] = true; clicked[7] = true; s1(); }
				//
				Turn = true;
			}
			else if (hit1[2] == false && hit1[5] == false && hit1[8] == false)
			{
				if (clicked[2] == false) { hit2[2] = true; clicked[2] = true; s1(); }
				else if (clicked[5] == false) { hit2[5] = true; clicked[5] = true; s1(); }
				else if (clicked[8] == false) { hit2[8] = true; clicked[8] = true; s1(); }
				//
				Turn = true;
			}
			else if (hit1[2] == false && hit1[4] == false && hit1[6] == false)
			{
				if (clicked[2] == false) { hit2[2] = true; clicked[2] = true; s1(); }
				else if (clicked[4] == false) { hit2[4] = true; clicked[4] = true; s1(); }
				else if (clicked[6] == false) { hit2[6] = true; clicked[6] = true; s1(); }
				//
				Turn = true;
			}
			else if (hit1[0] == false && hit1[4] == false && hit1[8] == false)
			{
				if (clicked[0] == false) { hit2[0] = true; clicked[0] = true; s1(); }
				else if (clicked[4] == false) { hit2[4] = true; clicked[4] = true; s1(); }
				else if (clicked[8] == false) { hit2[8] = true; clicked[8] = true; s1(); }
				//
				Turn = true;
			}
			else { randomAI(); }

		}

		protected override void OnPaint(System.Windows.Forms.PaintEventArgs e)
		{

			Graphics dc = e.Graphics;

#if My_Debug
			TextFormatFlags flags = TextFormatFlags.Left | TextFormatFlags.EndEllipsis;
			Font _font = new System.Drawing.Font("Stencil", 12, FontStyle.Regular);
			TextRenderer.DrawText(dc, "X=" + _cursX.ToString() + ":" + "Y=" + _cursY.ToString(), _font,
				new Rectangle(10, 10, 120, 20), SystemColors.ControlText, flags);
#endif

			//UI Screen
			TextFormatFlags flags1 = TextFormatFlags.Left;
			Font font = new System.Drawing.Font("Stencil", 14, FontStyle.Regular);
			TextRenderer.DrawText(e.Graphics, "Start", font, new Rectangle(25, 30, 120, 20), SystemColors.ControlText, flags1);
			TextRenderer.DrawText(e.Graphics, "Reset", font, new Rectangle(25, 60, 120, 20), SystemColors.ControlText, flags1);
			TextRenderer.DrawText(e.Graphics, "Wins: " + wins.ToString(), font, new Rectangle(480, 350, 420, 20), SystemColors.ControlText, flags1);
			TextRenderer.DrawText(e.Graphics, "Losses: " + losses.ToString(), font, new Rectangle(480, 400, 420, 20), SystemColors.ControlText, flags1);
			//Game Information using many conditional statements
			Font font1 = new System.Drawing.Font("Stencil", 24, FontStyle.Regular);
			if (Turn == false && winTrigger == false && loseTrigger == false && _stale == false){ TextRenderer.DrawText(e.Graphics, "CPU", font1, new Rectangle(20, 420, 150, 35), SystemColors.ControlText, flags1); }
			if (Turn == true && winTrigger == false && loseTrigger == false && _stale == false) { TextRenderer.DrawText(e.Graphics, "Player Turn", font, new Rectangle(20, 420, 150, 35), SystemColors.ControlText, flags1); }
			if (winTrigger == true && _stale == false) { TextRenderer.DrawText(e.Graphics, "You WIN !", font, new Rectangle(20, 420, 150, 35), SystemColors.ControlText, flags1); }
			if(loseTrigger == true && _stale == false) { TextRenderer.DrawText(e.Graphics, "You LOSE !", font, new Rectangle(20, 420, 150, 35), SystemColors.ControlText, flags1); }
			if (_stale == true) { TextRenderer.DrawText(e.Graphics, "STALEMATE", font, new Rectangle(20, 420, 150, 35), SystemColors.ControlText, flags1); }
			//user marks
			{
				if (hit1[0] == true) { _y1.DrawImage(dc); }
				if (hit1[1] == true) { _y2.DrawImage(dc); }
				if (hit1[2] == true) { _y3.DrawImage(dc); }
				if (hit1[3] == true) { _y4.DrawImage(dc); }
				if (hit1[4] == true) { _y5.DrawImage(dc); }
				if (hit1[5] == true) { _y6.DrawImage(dc); }
				if (hit1[6] == true) { _y7.DrawImage(dc); }
				if (hit1[7] == true) { _y8.DrawImage(dc); }
				if (hit1[8] == true) { _y9.DrawImage(dc); }
			}
			//computer marks
			{
				if (hit2[0] == true) { _x1.DrawImage(dc); }
				if (hit2[1] == true) { _x2.DrawImage(dc); }
				if (hit2[2] == true) { _x3.DrawImage(dc); }
				if (hit2[3] == true) { _x4.DrawImage(dc); }
				if (hit2[4] == true) { _x5.DrawImage(dc); }
				if (hit2[5] == true) { _x6.DrawImage(dc); }
				if (hit2[6] == true) { _x7.DrawImage(dc); }
				if (hit2[7] == true) { _x8.DrawImage(dc); }
				if (hit2[8] == true) { _x9.DrawImage(dc); }
				else { }
			}
			
			base.OnPaint(e);
		}

		private void Form1_MouseMove(object sender, MouseEventArgs e)
		{
#if My_Debug
			_cursX = e.X;
			_cursY = e.Y;
#endif
			this.Refresh();
		}
		private void Form1_MouseClick(object sender, MouseEventArgs e)
		{
			//check which squre was chosen
			if (e.X > 155 & e.X < 235 && e.Y > 90 && e.Y < 170)
			{
				
				if (clicked[0] != true && _Start == true) { Turn = false; hit1[0] = true; clicked[0] = true; quack(); } else { }
			}
			else if(e.X > 155 & e.X < 235 && e.Y > 205 && e.Y < 285)
			{
				
				if (clicked[3] != true && _Start == true) { Turn = false; hit1[3] = true; ; clicked[3] = true; quack(); } else { }
			}
			else if (e.X > 155 & e.X < 235 && e.Y > 305 && e.Y < 385)
			{
				
				if (clicked[6] != true && _Start == true) { Turn = false; hit1[6] = true; ; clicked[6] = true; quack(); } else { }
			}
			else if (e.X > 255 & e.X < 335 && e.Y > 90 && e.Y < 170)
			{
				
				if (clicked[1] != true && _Start == true) { Turn = false; hit1[1] = true; ; clicked[1] = true; quack(); } else { }
			}
			else if (e.X > 255 & e.X < 335 && e.Y > 205 && e.Y < 285)
			{
				
				if (clicked[4] != true && _Start == true) { Turn = false; hit1[4] = true; ; clicked[4] = true; quack(); } else { }
			}
			else if (e.X > 255 & e.X < 335 && e.Y > 305 && e.Y < 385)
			{
				
				if (clicked[7] != true && _Start == true) { Turn = false; hit1[7] = true; ; clicked[7] = true; quack(); } else { }
			}
			else if (e.X > 355 & e.X < 455 && e.Y > 90 && e.Y < 170)
			{
				
				if (clicked[2] != true && _Start == true) { Turn = false; hit1[2] = true; ; clicked[2] = true; quack(); } else { }
			}
			else if (e.X > 355 & e.X < 455 && e.Y > 205 && e.Y < 285)
			{
				
				if (clicked[5] != true && _Start == true) { Turn = false; hit1[5] = true; ; clicked[5] = true; quack(); } else { }
			}
			else if (e.X > 355 & e.X < 455 && e.Y > 305 && e.Y < 385)
			{
				
				if (clicked[8] != true && _Start == true) { Turn = false; hit1[8] = true; ; clicked[8] = true; quack(); } else { }
			}
			else if (e.X > 20 && e.X < 100 && e.Y > 24 && e.Y < 52)
			{
				_Start = true;
				
				//Determine who gets first turn
				int randmcnally = rnd.Next(0, 2);
				if(randmcnally == 0){ Turn = false; }
				else { Turn = true; }
				quack();
			}
			else if( e.X > 20 && e.X < 100 && e.Y > 62 && e.Y < 88)
			{
				Application.Restart();
			}

		}
		private void quack()
		{
			SoundPlayer simpleSound = new SoundPlayer(Resources.DuckSound);
			simpleSound.Play();
		}
		private void s1()
		{
			SoundPlayer simpleSound = new SoundPlayer(Resources.Duck_Hunt_SFX__7_);
			simpleSound.Play();
		}
		private void s2()
		{
			SoundPlayer simpleSound = new SoundPlayer(Resources.Duck_Hunt_SFX__11_);
			simpleSound.Play();
		}
	}
}
