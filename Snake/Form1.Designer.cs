using System;

namespace Snake
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
			this.components = new System.ComponentModel.Container();
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
			this.pbCanvas = new System.Windows.Forms.PictureBox();
			this.label1 = new System.Windows.Forms.Label();
			this.LabelScore = new System.Windows.Forms.Label();
			this.GameTimer = new System.Windows.Forms.Timer(this.components);
			this.labelGameOver = new System.Windows.Forms.Label();
			this.label3 = new System.Windows.Forms.Label();
			this.labelLevel = new System.Windows.Forms.Label();
			((System.ComponentModel.ISupportInitialize)(this.pbCanvas)).BeginInit();
			this.SuspendLayout();
			// 
			// pbCanvas
			// 
			this.pbCanvas.BackColor = System.Drawing.SystemColors.ScrollBar;
			this.pbCanvas.Location = new System.Drawing.Point(3, 2);
			this.pbCanvas.Name = "pbCanvas";
			this.pbCanvas.Size = new System.Drawing.Size(584, 356);
			this.pbCanvas.TabIndex = 0;
			this.pbCanvas.TabStop = false;
			this.pbCanvas.Paint += new System.Windows.Forms.PaintEventHandler(this.pbCanvas_Paint);
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.BackColor = System.Drawing.SystemColors.ScrollBar;
			this.label1.Font = new System.Drawing.Font("Onyx", 25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label1.Location = new System.Drawing.Point(592, 29);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(72, 38);
			this.label1.TabIndex = 1;
			this.label1.Text = "Score:";
			// 
			// LabelScore
			// 
			this.LabelScore.AutoSize = true;
			this.LabelScore.BackColor = System.Drawing.SystemColors.ScrollBar;
			this.LabelScore.Font = new System.Drawing.Font("Stencil", 23F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.LabelScore.Location = new System.Drawing.Point(681, 29);
			this.LabelScore.Name = "LabelScore";
			this.LabelScore.Size = new System.Drawing.Size(17, 37);
			this.LabelScore.TabIndex = 2;
			this.LabelScore.Text = "\r\n";
			// 
			// labelGameOver
			// 
			this.labelGameOver.AutoSize = true;
			this.labelGameOver.BackColor = System.Drawing.SystemColors.ScrollBar;
			this.labelGameOver.Font = new System.Drawing.Font("Microsoft Sans Serif", 20F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.labelGameOver.Location = new System.Drawing.Point(230, 139);
			this.labelGameOver.Name = "labelGameOver";
			this.labelGameOver.Size = new System.Drawing.Size(86, 31);
			this.labelGameOver.TabIndex = 3;
			this.labelGameOver.Text = "label2";
			this.labelGameOver.Visible = false;
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.BackColor = System.Drawing.SystemColors.ScrollBar;
			this.label3.Font = new System.Drawing.Font("Onyx", 28F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label3.Location = new System.Drawing.Point(593, 168);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(75, 42);
			this.label3.TabIndex = 4;
			this.label3.Text = "Level: ";
			// 
			// labelLevel
			// 
			this.labelLevel.AutoSize = true;
			this.labelLevel.Font = new System.Drawing.Font("Stencil", 22F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.labelLevel.ForeColor = System.Drawing.SystemColors.ActiveCaption;
			this.labelLevel.Image = ((System.Drawing.Image)(resources.GetObject("labelLevel.Image")));
			this.labelLevel.Location = new System.Drawing.Point(708, 176);
			this.labelLevel.Name = "labelLevel";
			this.labelLevel.Size = new System.Drawing.Size(0, 35);
			this.labelLevel.TabIndex = 5;
			// 
			// Form1
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.BackColor = System.Drawing.SystemColors.Control;
			this.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("$this.BackgroundImage")));
			this.ClientSize = new System.Drawing.Size(800, 450);
			this.Controls.Add(this.labelLevel);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.labelGameOver);
			this.Controls.Add(this.LabelScore);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.pbCanvas);
			this.Name = "Form1";
			this.Text = "Form1";
			this.TransparencyKey = System.Drawing.Color.White;
			this.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Form1_KeyDown);
			this.KeyUp += new System.Windows.Forms.KeyEventHandler(this.Form1_KeyUp);
			((System.ComponentModel.ISupportInitialize)(this.pbCanvas)).EndInit();
			this.ResumeLayout(false);
			this.PerformLayout();

        }

		
		#endregion

		private System.Windows.Forms.PictureBox pbCanvas;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Label LabelScore;
		private System.Windows.Forms.Timer GameTimer;
		private System.Windows.Forms.Label labelGameOver;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.Label labelLevel;
	}
}

