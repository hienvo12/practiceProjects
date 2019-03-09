//#define My_Debug

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Media;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Mole_Shooter.Properties;
using System.Threading;

namespace Mole_Shooter
{

	public partial class MoleShooter : Form {
		//
		int FrameNum = 15;
		const int SplatNum = 3;

		bool gameone = false;
		bool splat = false;
		int splatTime = 0;
		int gameFrame = 0;

		int hits = 0;
		int misses = 0;
		int totalShots = 0;
		double avgShots = 0;
		int Level = 0;
		int levelgap = 0;
		int intensity = 0;

		//
		
#if My_Debug
		int _cursX = 0;
		int _cursY = 0;
#endif

		CDuck _mole;
		DeadDuck _deadDuck;
		CMenu _menu;

		Random rnd = new Random();


		public MoleShooter() {
			InitializeComponent();

			//create reticle
			Bitmap b = new Bitmap(Resources.Target_Dot_Ret_380);
			//this.Cursor = new Reticle.Cursor(b, b.Height / 2, b.Width / 2);

			_menu = new CMenu() { Left = 620, Top = 10 };
			_deadDuck = new DeadDuck();
			_mole = new CDuck() { Left = 300, Top = 250 };
		}

		private void timer1_Tick(object sender, EventArgs e)
		{
			if (gameFrame >= FrameNum)
			{
				UpdateMole();
				gameFrame = 0;
			}
			if (splat)
			{

				if (splatTime >= SplatNum)
				{
					splat = false;
					splatTime = 0;
					UpdateMole();
				}
				else { splatTime++; }
			}
			gameFrame++;
			this.Refresh();
		}



		private void UpdateMole()
		{
			_mole.Update(
				rnd.Next(Resources.DuckHuntDuck.Width, this.Width - Resources.DuckHuntDuck.Width),
				rnd.Next(this.Height / 2, this.Height - Resources.DuckHuntDuck.Height * 2)
			);
		}

		protected override void OnPaint(PaintEventArgs e)
		{
			Graphics dc = e.Graphics;
			if (splat == true)
			{
				_deadDuck.DrawImage(dc);
				timer1.Start();
			}
			else
			{
				_mole.DrawImage(dc);
			}

			_menu.DrawImage(dc);

#if My_Debug
			TextFormatFlags flags = TextFormatFlags.Left| TextFormatFlags.EndEllipsis;
			Font _font = new System.Drawing.Font("Stencil", 12, FontStyle.Regular);
			TextRenderer.DrawText(dc, "X=" + _cursX.ToString() + ":" + "Y=" + _cursY.ToString(), _font, 
				new Rectangle(10, 10, 120, 20), SystemColors.ControlText, flags);
#endif

			//Score screen
			TextFormatFlags flags1 = TextFormatFlags.Left;
			Font font = new System.Drawing.Font("Stencil", 14, FontStyle.Regular);
			TextRenderer.DrawText(e.Graphics, "Shots: " + totalShots.ToString(), font, new Rectangle(30, 32, 120, 20), SystemColors.Control, flags1);
			TextRenderer.DrawText(e.Graphics, "Hits: " + hits.ToString(), font, new Rectangle(30, 52, 120, 20), SystemColors.Control, flags1);
			TextRenderer.DrawText(e.Graphics, "Misses: " + misses.ToString(), font, new Rectangle(30, 72, 120, 20), SystemColors.Control, flags1);
			TextRenderer.DrawText(e.Graphics, "Avg: " + avgShots.ToString(), font, new Rectangle(30, 92, 120, 20), SystemColors.Control, flags1);
			TextRenderer.DrawText(e.Graphics, "Level: " + Level.ToString(), font, new Rectangle(30, 112, 120, 20), SystemColors.Control, flags1);


			base.OnPaint(e);
		}

		private void MoleShooter_MouseMove(object sender, MouseEventArgs e)
		{
#if My_Debug
			_cursX = e.X;
			_cursY = e.Y;
#endif
			this.Refresh();
		}

		
		private void FireGun()
		{
			//fire 
			SoundPlayer simpleSound = new SoundPlayer(Resources.shoot3);

			simpleSound.Play();
		}
		private void DuckSound()
		{
			SoundPlayer simpleSound = new SoundPlayer(Resources.DuckSound);
			simpleSound.Play();
		}
		private void StartSound()
		{
			SoundPlayer simpleSound = new SoundPlayer(Resources.Duck_Hunt_SFX__7_);
			simpleSound.Play();
		}
		private void StopSound()
		{
			SoundPlayer simpleSound = new SoundPlayer(Resources.Duck_Hunt_SFX__8_);
			simpleSound.Play();
		}
		private void LevelUpSound()
		{
			SoundPlayer simpleSound = new SoundPlayer(Resources.Duck_Hunt_SFX__9_);
			simpleSound.Play();
		}

		
		private void MoleShooter_MouseClick(object sender, MouseEventArgs e)
		{
			FireGun();
			if (e.X > 670 && e.X < 750 && e.Y > 25 && e.Y < 55)
			{
				timer1.Enabled = true;
				gameone = true;
				timer1.Start();
				StartSound();
				
			}
			else if (e.X > 670 && e.X < 750 && e.Y > 75 && e.Y < 103)
			{
				timer1.Stop();
				gameone = false;
				StopSound();
			}
			else if (e.X > 670 && e.X < 750 && e.Y > 125 && e.Y < 150)
			{
				timer1.Stop();
				gameone = false;
				Application.Restart();
			}
			else if (e.X > 670 && e.X < 750 && e.Y > 165 && e.Y < 205)
			{
				timer1.Stop();
				gameone = false;
				Application.Exit();
				
			}
			else
			{
				if (_mole.Hit(e.X, e.Y))
				{
					splat = true;
					_deadDuck.Left = _mole.Left - Resources.DeadDuck.Width / 3;
					_deadDuck.Top = _mole.Top - Resources.DeadDuck.Height / 3;

					if(gameone == true) { hits++; DuckSound(); timer1.Stop(); }

					
				}
				else { if (gameone == true) { misses++; } }
				
				totalShots = hits + misses;
				avgShots = ((double)(hits) / (double) (totalShots)) * 100;
			}

			//Level
			if(hits == 2 && avgShots > 55) { Level++; FrameNum = gameFrame - 2; LevelUpSound(); }
			else if (hits == 5 && avgShots > 65) { Level++; FrameNum = FrameNum - 2; LevelUpSound(); }
			else if (hits == 10 && avgShots > 75) { Level++; FrameNum = FrameNum - 2; LevelUpSound(); }
			else if (hits == 15 && avgShots > 80) { Level++; FrameNum = FrameNum - 2; LevelUpSound(); }
			else if (hits == 25 && avgShots >= 85) { Level++; FrameNum = FrameNum - 1; LevelUpSound(); }
			else if(hits > 50)
			{
				
				if(levelgap == 10)
				{
					Level++;
					LevelUpSound();
					levelgap = 0;
						
				}
				if (intensity == 15)
				{
					FrameNum = FrameNum--;
					LevelUpSound();
					intensity = 0;
				}
				else { levelgap++; intensity++; }

				if(FrameNum == 0)
				{
					Application.Restart();
				}
			}
			

		}



		//
		//
	}
}
